$dll = 'C:\Program Files\Autodesk\Inventor 2024\Bin\Public Assemblies\Autodesk.Inventor.Interop.dll'
$out = Join-Path $PSScriptRoot 'InventorConstants.txt'
$asm = [Reflection.Assembly]::LoadFrom($dll)
$lines = New-Object System.Collections.Generic.List[string]
$lines.Add("Source: $dll")
$lines.Add("Generated: $(Get-Date -Format o)")
$lines.Add('')

$enums = $asm.GetExportedTypes() | Where-Object { $_.IsEnum } | Sort-Object FullName
foreach ($e in $enums) {
    $lines.Add("=== $($e.FullName) ===")
    [enum]::GetNames($e) | ForEach-Object {
        $val = [int][enum]::Parse($e, $_)
        $lines.Add("  $_ = $val")
    }
    $lines.Add('')
}

$lines | Out-File $out -Encoding utf8
Write-Host "Wrote $($enums.Count) enums to $out"

# Highlight enums used by CupCreator
$focus = @(
    'Inventor.PartFeatureOperationEnum',
    'Inventor.PartFeatureExtentDirectionEnum',
    'Inventor.PartFeatureExtentEnum',
    'Inventor.DocumentTypeEnum',
    'Inventor.UnitsTypeEnum'
)
$lines.Add('=== CUPCREATOR QUICK REFERENCE ===')
foreach ($name in $focus) {
    $t = $asm.GetType($name)
    if ($null -eq $t) { continue }
    $lines.Add("--- $name ---")
    [enum]::GetNames($t) | ForEach-Object {
        $val = [int][enum]::Parse($t, $_)
        $lines.Add("  $_ = $val")
    }
    $lines.Add('')
}
$lines | Out-File $out -Encoding utf8
