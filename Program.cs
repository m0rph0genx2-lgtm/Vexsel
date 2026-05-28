using System;
using System.Runtime.InteropServices;
using Inventor;

namespace CupCreator
{
    class Program
    {
        static void Main(string[] args)
        {
            Inventor.Application inventorApp = null;
            try
            {
                inventorApp = (Inventor.Application)Marshal.GetActiveObject("Inventor.Application");
            }
            catch
            {
                Type inventorType = Type.GetTypeFromProgID("Inventor.Application");
                inventorApp = (Inventor.Application)Activator.CreateInstance(inventorType);
                inventorApp.Visible = true;
            }

            // Создаем новую деталь
            Documents documents = inventorApp.Documents;
            PartDocument partDoc = (PartDocument)documents.Add(DocumentTypeEnum.kPartDocumentObject,
                inventorApp.FileManager.GetTemplateFile(DocumentTypeEnum.kPartDocumentObject));
            PartComponentDefinition compDef = partDoc.ComponentDefinition;

            // Создаем эскиз на плоскости XY
            PlanarSketch sketch = compDef.Sketches.Add(compDef.WorkPlanes[3]); // XY plane

            // Параметры стакана
            double innerRadius = 3.0; // 30 мм в см (Inventor использует см)
            double outerRadius = 3.4; // 34 мм
            double height = 10.0;      // 100 мм

            // Рисуем профиль стенки
            TransientGeometry tg = inventorApp.TransientGeometry;
            SketchLine line1 = sketch.SketchLines.AddByTwoPoints(
                tg.CreatePoint2d(innerRadius, 0),
                tg.CreatePoint2d(outerRadius, 0));
            SketchLine line2 = sketch.SketchLines.AddByTwoPoints(
                tg.CreatePoint2d(outerRadius, 0),
                tg.CreatePoint2d(outerRadius, height));
            SketchLine line3 = sketch.SketchLines.AddByTwoPoints(
                tg.CreatePoint2d(outerRadius, height),
                tg.CreatePoint2d(innerRadius, height));
            SketchLine line4 = sketch.SketchLines.AddByTwoPoints(
                tg.CreatePoint2d(innerRadius, height),
                tg.CreatePoint2d(innerRadius, 0));

            // Revolve вокруг оси Y
            RevolveFeature revolve = compDef.Features.RevolveFeatures.AddByAngle(
                sketch.Profiles.AddForSolid(),
                compDef.WorkAxes[2], // ось Y
                360.0 / 180.0 * Math.PI, // полный оборот в радианах
                PartFeatureOperationEnum.kNewBodyOperation);

            // Сохраняем деталь
            string filePath = System.IO.Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.Desktop),
                "Стакан.ipt");
            partDoc.SaveAs(filePath, false);

            Console.WriteLine($"OK: Деталь 'Стакан' создана и сохранена: {filePath}");
        }
    }
}