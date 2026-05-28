Imports System
Imports System.Reflection
Imports Microsoft.VisualBasic

Module CubeByParameter
    Private Const kPartDocumentObject As Integer = 12290
    Private Const kNewBodyOperation As Integer = 20485
    Private Const kPositiveExtentDirection As Integer = 20993
    Private Const kMillimeterLengthUnits As Integer = 11269

    Sub Main()
        Try
            Dim invApp As Object = ConnectInventor()
            invApp.Visible = True

            Dim template As Object = invApp.FileManager.GetTemplateFile(kPartDocumentObject)
            Dim partDoc As Object = invApp.Documents.Add(kPartDocumentObject, template, True)
            Dim compDef As Object = partDoc.ComponentDefinition
            Dim tg As Object = invApp.TransientGeometry

            Dim userParams As Object = compDef.Parameters.UserParameters
            Dim lengthParam As Object = userParams.AddByValue("Длина", CDbl(100), kMillimeterLengthUnits)

            ' План эскиза: квадрат 100×100 мм (10×10 см во внутренних единицах)
            Dim sideCm As Double = CDbl(10)
            Dim sketch As Object = compDef.Sketches.Add(compDef.WorkPlanes.Item(3))
            sketch.SketchLines.AddAsTwoPointRectangle(
                tg.CreatePoint2d(CDbl(0), CDbl(0)),
                tg.CreatePoint2d(sideCm, sideCm))

            Dim profile As Object = sketch.Profiles.AddForSolid()
            compDef.Features.ExtrudeFeatures.AddByDistanceExtent(
                profile, lengthParam, kPositiveExtentDirection, kNewBodyOperation)

            Dim outPath As String = "C:\AFAR_PROJECT\CupCreator\CubeByParameter.ipt"
            Try
                partDoc.SaveAs(outPath, False)
            Catch
                outPath = "C:\AFAR_PROJECT\CupCreator\CubeByParameter_" &
                    DateTime.Now.ToString("yyyyMMdd_HHmmss") & ".ipt"
                partDoc.SaveAs(outPath, False)
            End Try
            partDoc.Update()

            Console.WriteLine("OK: Куб 100×100×100 мм, параметр «Длина»=" & GetProperty(lengthParam, "Expression"))
            Console.WriteLine("Сохранено: " & outPath)
            Environment.Exit(0)
        Catch ex As Exception
            Console.WriteLine("FAIL: " & ex.Message)
            Environment.Exit(1)
        End Try
    End Sub

    Private Function GetProperty(obj As Object, name As String) As Object
        Return obj.GetType().InvokeMember(name, BindingFlags.GetProperty, Nothing, obj, Nothing)
    End Function

    Private Function ConnectInventor() As Object
        Dim invType As Type = Type.GetTypeFromProgID("Inventor.Application")
        Try
            Return System.Runtime.InteropServices.Marshal.GetActiveObject("Inventor.Application")
        Catch
            Return Activator.CreateInstance(invType)
        End Try
    End Function
End Module
