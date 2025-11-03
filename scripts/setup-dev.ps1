# Local Development Scripts
# Test your application before deploying

Write-Host "🧪 ML Finals Exam - Local Development Test" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if backend .env exists
if (-Not (Test-Path "backend\.env")) {
    Write-Host "⚠️  Warning: backend\.env not found" -ForegroundColor Yellow
    Write-Host "Creating from .env.example..." -ForegroundColor Yellow
    Copy-Item "backend\.env.example" "backend\.env"
    Write-Host "✅ Created backend\.env - Please review and update if needed" -ForegroundColor Green
    Write-Host ""
}

# Check if frontend .env exists
if (-Not (Test-Path ".env")) {
    Write-Host "⚠️  Warning: .env not found" -ForegroundColor Yellow
    Write-Host "Creating from frontend\.env.example..." -ForegroundColor Yellow
    Copy-Item "frontend\.env.example" ".env"
    Write-Host "✅ Created .env - Using localhost:5000 for development" -ForegroundColor Green
    Write-Host ""
}

Write-Host "📦 Installing Dependencies..." -ForegroundColor Cyan
Write-Host ""

# Install Python dependencies
Write-Host "Installing Python packages..." -ForegroundColor Yellow
Set-Location backend
python -m pip install -r requirements.txt
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install Python dependencies" -ForegroundColor Red
    exit 1
}
Set-Location ..

# Install Node dependencies
Write-Host "Installing Node packages..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install Node dependencies" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ All dependencies installed!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 To start development servers:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Backend:  cd backend && python app.py" -ForegroundColor White
Write-Host "  Frontend: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "  Backend will run on:  http://localhost:5000" -ForegroundColor Gray
Write-Host "  Frontend will run on: http://localhost:5173" -ForegroundColor Gray
Write-Host ""
Write-Host "💡 Tip: Run these in separate terminal windows" -ForegroundColor Yellow
Write-Host ""
