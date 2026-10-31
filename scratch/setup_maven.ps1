$zipPath = Join-Path $env:TEMP "apache-maven-3.9.6-bin.zip"
$destDir = "backend\.maven"

if (-not (Test-Path "$destDir\apache-maven-3.9.6\bin\mvn.cmd")) {
    Write-Host "Downloading Maven 3.9.6..."
    Invoke-WebRequest -Uri "https://archive.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip" -OutFile $zipPath -UseBasicParsing
    Write-Host "Extracting Maven..."
    Expand-Archive -Path $zipPath -DestinationPath $destDir -Force
    if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
}

$mvnCmd = (Get-ChildItem -Path $destDir -Filter "mvn.cmd" -Recurse | Select-Object -First 1).FullName
Write-Host "Found Maven at: $mvnCmd"
& $mvnCmd -v
