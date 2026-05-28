$ErrorActionPreference = 'Continue'
Set-Location $PSScriptRoot
$log = Join-Path $PSScriptRoot 'last-run.log'
Remove-Item $log -ErrorAction SilentlyContinue

function Log($m) { "$(Get-Date -Format o) $m" | Tee-Object -FilePath $log -Append }

try {
    Log '=== dotnet build ==='
    & dotnet build CupCreator.vbproj 2>&1 | ForEach-Object { Log $_ }
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

    Log '=== dotnet run ==='
    & dotnet run --project CupCreator.vbproj 2>&1 | ForEach-Object { Log $_ }
    $code = $LASTEXITCODE
    Log "EXIT: $code"
    exit $code
} catch {
    Log $_.Exception.ToString()
    exit 1
}
