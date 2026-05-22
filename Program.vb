Imports System
Imports Microsoft.VisualBasic

Module Program
    ' Constants from Autodesk.Inventor.Interop.dll (Inventor 2024) — see InventorConstants.txt
    Private Const kPartDocumentObject As Integer = 12290
    Private Const kJoinOperation As Integer = 20481
    Private Const kNewBodyOperation As Integer = 20485
    Private Const kPositiveExtentDirection As Integer = 20993

    Sub Main()
        Try
            Dim invType As Type = Type.GetTypeFromProgID("Inventor.Application")
            Dim invApp As Object = Nothing
            Try
                invApp = System.Runtime.InteropServices.Marshal.GetActiveObject("Inventor.Application")
            Catch
                invApp = Activator.CreateInstance(invType)
            End Try
            If invApp Is Nothing Then
                Console.WriteLine("Критическая ошибка: Не удалось инициализировать Inventor API.")
                Environment.Exit(1)
            End If
            invApp.Visible = True

            Dim template As Object = invApp.FileManager.GetTemplateFile(kPartDocumentObject)
            Dim partDoc As Object = invApp.Documents.Add(kPartDocumentObject, template, True)
            Dim compDef As Object = partDoc.ComponentDefinition
            Dim tg As Object = invApp.TransientGeometry

            ' Internal API length units: centimeters (R 3.0 cm = Ø60 mm, H 10.0 cm = 100 mm)
            Dim sketch As Object = compDef.Sketches.Add(compDef.WorkPlanes.Item(3))
            Dim circle As Object = sketch.SketchCircles.AddByCenterRadius(
                tg.CreatePoint2d(CDbl(0), CDbl(0)), CDbl(3.0))
            Dim profile As Object = sketch.Profiles.AddForSolid()
            Dim extrude As Object = compDef.Features.ExtrudeFeatures.AddByDistanceExtent(
                profile, CDbl(10.0), kPositiveExtentDirection, kNewBodyOperation)

            partDoc.SaveAs("C:\AFAR_PROJECT\CupCreator\Cup.ipt", False)
            Console.WriteLine("Скрипт успешно построил модель Стакан в Inventor!")
            Environment.Exit(0)
        Catch ex As Exception
            Console.WriteLine("FAIL: " & ex.Message)
            Environment.Exit(1)
        End Try
    End Sub
End Module
