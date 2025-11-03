# Production Build Test
# Test production build locally before deploying

Write-Host "🏗️  ML Finals Exam - Production Build Test" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check environment files
$missingEnv = $false

if (-Not (Test-Path ".env.production")) {
    Write-Host "❌ .env.production not found!" -ForegroundColor Red
    Write-Host "   Please create it with your backend URL" -ForegroundColor Yellow
    $missingEnv = $true
}

if (-Not (Test-Path "backend\.env")) {
    Write-Host "❌ backend\.env not found!" -ForegroundColor Red
    Write-Host "   Please copy from backend\.env.example" -ForegroundColor Yellow
    $missingEnv = $true
}

if ($missingEnv) {
    Write-Host ""
    Write-Host "⚠️  Fix the issues above before building for production" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Environment files found" -ForegroundColor Green
Write-Host ""

# Load production API URL
$envContent = Get-Content ".env.production"
$apiUrl = ($envContent | Where-Object { $_ -match "VITE_API_URL=" }) -replace "VITE_API_URL=", ""
Write-Host "📡 API URL: $apiUrl" -ForegroundColor Cyan
Write-Host ""

# Build frontend
Write-Host "🔨 Building frontend for production..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ Build failed! Check errors above" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Build successful!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Build output:" -ForegroundColor Cyan

if (Test-Path "dist") {
    $distSize = (Get-ChildItem -Path "dist" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
    $fileCount = (Get-ChildItem -Path "dist" -Recurse -File).Count
    
    Write-Host "  Directory: dist/" -ForegroundColor Gray
    Write-Host "  Files: $fileCount" -ForegroundColor Gray
    Write-Host "  Size: $([math]::Round($distSize, 2)) MB" -ForegroundColor Gray
}

Write-Host ""
Write-Host "🧪 To test production build locally:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  npm install -g serve" -ForegroundColor White
Write-Host "  serve -s dist -p 3000" -ForegroundColor White
Write-Host ""
Write-Host "  Then visit: http://localhost:3000" -ForegroundColor Gray
Write-Host ""
Write-Host "✨ Ready to deploy!" -ForegroundColor Green
Write-Host ""
