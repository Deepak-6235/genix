# PowerShell script to replace original images with compressed versions

$imagesDir = "public\images"

Write-Host "Image Compression Summary" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

$compressedFiles = Get-ChildItem "$imagesDir\compressed_*.jpg"

foreach ($file in $compressedFiles) {
    $originalName = $file.Name -replace "^compressed_", ""
    $originalPath = Join-Path $imagesDir $originalName
    $compressedPath = $file.FullName
    
    if (Test-Path $originalPath) {
        $originalSize = (Get-Item $originalPath).Length / 1MB
        $compressedSize = $file.Length / 1MB
        $reduction = [math]::Round((($originalSize - $compressedSize) / $originalSize) * 100, 1)
        
        Write-Host "$originalName" -ForegroundColor Yellow
        Write-Host "  Original:   $([math]::Round($originalSize, 2)) MB" -ForegroundColor Gray
        Write-Host "  Compressed: $([math]::Round($compressedSize, 2)) MB" -ForegroundColor Green
        Write-Host "  Reduction:  $reduction%" -ForegroundColor Green
        Write-Host ""
    }
}

Write-Host ""
Write-Host "Do you want to replace the original images with compressed versions? (Y/N)" -ForegroundColor Yellow
$response = Read-Host

if (($response -eq "Y") -or ($response -eq "y")) {
    foreach ($file in $compressedFiles) {
        $originalName = $file.Name -replace "^compressed_", ""
        $originalPath = Join-Path $imagesDir $originalName
        $compressedPath = $file.FullName
        
        if (Test-Path $originalPath) {
            # Backup is already in originals folder
            Remove-Item $originalPath -Force
            Rename-Item $compressedPath $originalName
            Write-Host "Replaced $originalName" -ForegroundColor Green
        }
    }
    Write-Host ""
    Write-Host "All images replaced successfully!" -ForegroundColor Green
    Write-Host "Original images are backed up in public\images\originals\" -ForegroundColor Cyan
} else {
    Write-Host "Operation cancelled. Compressed files remain with 'compressed_' prefix." -ForegroundColor Yellow
}
