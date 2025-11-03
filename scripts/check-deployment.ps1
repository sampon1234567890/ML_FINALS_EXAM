# Pre-Deployment Checker
# Verify everything is ready before deploying

Write-Host "✅ ML Finals Exam - Pre-Deployment Checker" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Check Git status
Write-Host "📋 Checking Git status..." -ForegroundColor Cyan
$gitStatus = git status --porcelain

if ($gitStatus) {
    Write-Host "⚠️  Uncommitted changes found:" -ForegroundColor Yellow
    git status --short
    Write-Host ""
    $allGood = $false
} else {
    Write-Host "✅ All changes committed" -ForegroundColor Green
}
Write-Host ""

# Check required files
Write-Host "📄 Checking required files..." -ForegroundColor Cyan
$requiredFiles = @(
    "backend/app.py",
    "backend/requirements.txt",
    "backend/.env.example",
    "Procfile",
    "render.yaml",
    "vercel.json",
    "package.json",
    ".gitignore"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file - MISSING!" -ForegroundColor Red
        $allGood = $false
    }
}
Write-Host ""

# Check .env files not committed
Write-Host "🔒 Checking sensitive files not committed..." -ForegroundColor Cyan
$sensitiveFiles = @("backend/.env", ".env", ".env.local")
$gitFiles = git ls-files

foreach ($file in $sensitiveFiles) {
    if ($gitFiles -contains $file) {
        Write-Host "  ❌ $file is in Git! Remove it immediately!" -ForegroundColor Red
        $allGood = $false
    } else {
        Write-Host "  ✅ $file not in Git (good)" -ForegroundColor Green
    }
}
Write-Host ""

# Check backend dependencies
Write-Host "🐍 Checking Python dependencies..." -ForegroundColor Cyan
if (Test-Path "backend/requirements.txt") {
    $reqContent = Get-Content "backend/requirements.txt"
    $criticalPackages = @("Flask", "gunicorn", "python-dotenv", "flask-cors")
    
    foreach ($pkg in $criticalPackages) {
        if ($reqContent -match $pkg) {
            Write-Host "  ✅ $pkg" -ForegroundColor Green
        } else {
            Write-Host "  ❌ $pkg - MISSING!" -ForegroundColor Red
            $allGood = $false
        }
    }
}
Write-Host ""

# Check frontend dependencies
Write-Host "📦 Checking Node dependencies..." -ForegroundColor Cyan
if (Test-Path "package.json") {
    $packageJson = Get-Content "package.json" | ConvertFrom-Json
    $criticalPackages = @("react", "react-dom", "vite")
    
    foreach ($pkg in $criticalPackages) {
        if ($packageJson.dependencies.$pkg -or $packageJson.devDependencies.$pkg) {
            Write-Host "  ✅ $pkg" -ForegroundColor Green
        } else {
            Write-Host "  ❌ $pkg - MISSING!" -ForegroundColor Red
            $allGood = $false
        }
    }
}
Write-Host ""

# Check environment examples exist
Write-Host "🔧 Checking environment templates..." -ForegroundColor Cyan
if (Test-Path "backend/.env.example") {
    Write-Host "  ✅ backend/.env.example exists" -ForegroundColor Green
} else {
    Write-Host "  ❌ backend/.env.example missing" -ForegroundColor Red
    $allGood = $false
}

if (Test-Path "frontend/.env.example") {
    Write-Host "  ✅ frontend/.env.example exists" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  frontend/.env.example missing (optional)" -ForegroundColor Yellow
}
Write-Host ""

# Check API configuration
Write-Host "🌐 Checking API configuration..." -ForegroundColor Cyan
if (Test-Path "src/utils/api.js") {
    $apiContent = Get-Content "src/utils/api.js" -Raw
    
    if ($apiContent -match "import\.meta\.env\.VITE_API_URL") {
        Write-Host "  ✅ API uses environment variable" -ForegroundColor Green
    } else {
        Write-Host "  ❌ API still hardcoded!" -ForegroundColor Red
        $allGood = $false
    }
}
Write-Host ""

# Final verdict
Write-Host "========================================" -ForegroundColor Cyan
if ($allGood) {
    Write-Host "🎉 All checks passed! Ready to deploy!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Push to GitHub: git push" -ForegroundColor White
    Write-Host "  2. Deploy backend to Render" -ForegroundColor White
    Write-Host "  3. Update .env.production with backend URL" -ForegroundColor White
    Write-Host "  4. Deploy frontend to Vercel" -ForegroundColor White
    Write-Host "  5. Update CORS_ORIGINS in Render" -ForegroundColor White
    Write-Host ""
    Write-Host "📖 See DEPLOYMENT_GUIDE.md for detailed instructions" -ForegroundColor Yellow
} else {
    Write-Host "⚠️  Issues found! Fix them before deploying" -ForegroundColor Red
    Write-Host ""
    Write-Host "See errors above and fix them first" -ForegroundColor Yellow
}
Write-Host ""
