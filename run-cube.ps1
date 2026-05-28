$ErrorActionPreference = 'Continue'
Set-Location $PSScriptRoot
$log = Join-Path $PSScriptRoot 'last-cube-run.log'
Remove-Item $log -ErrorAction SilentlyContinue
function Log($m) { "$(Get-Date -Format o) $m" | Tee-Object -FilePath $log -Append }
Log '=== dotnet build CubeByParameter ==='
& dotnet build CubeByParameter.vbproj 2>&1 | ForEach-Object { Log $_ }
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Log '=== dotnet run ==='
& dotnet run --project CubeByParameter.vbproj 2>&1 | ForEach-Object { Log $_ }
exit $LASTEXITCODE
