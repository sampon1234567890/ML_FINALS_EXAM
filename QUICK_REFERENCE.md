# 📝 Quick Reference - Deployment Commands

## 🚀 First-Time Deployment

### 1️⃣ Pre-Deployment Check
```powershell
.\scripts\check-deployment.ps1
```

### 2️⃣ Push to GitHub
```powershell
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### 3️⃣ Deploy Backend (Render)
- Go to: https://dashboard.render.com
- Click: **New + → Web Service**
- Connect GitHub repo
- **Build Command**: `cd backend && pip install -r requirements.txt`
- **Start Command**: `cd backend && gunicorn app:app`
- **Environment Variables**:
  ```
  FLASK_ENV=production
  PORT=5000
  CORS_ORIGINS=http://localhost:5173
  ```

### 4️⃣ Update Frontend Config
```powershell
# Edit .env.production
# Replace with your Render URL:
VITE_API_URL=https://your-backend.onrender.com
```

```powershell
git add .env.production
git commit -m "Update backend URL"
git push
```

### 5️⃣ Deploy Frontend (Vercel)
- Go to: https://vercel.com/dashboard
- Click: **Add New → Project**
- Import GitHub repo
- **Framework**: Vite
- **Environment Variable**:
  ```
  VITE_API_URL=https://your-backend.onrender.com
  ```
- Click: **Deploy**

### 6️⃣ Update CORS
- Go to Render Dashboard → Your Service → Environment
- Update `CORS_ORIGINS`:
  ```
  http://localhost:5173,https://your-app.vercel.app
  ```

---

## 🔄 Update Existing Deployment

### Backend Changes
```powershell
git add backend/
git commit -m "Update backend"
git push
# Render auto-deploys
```

### Frontend Changes
```powershell
git add src/
git commit -m "Update frontend"
git push
# Vercel auto-deploys
```

### Both Changes
```powershell
git add .
git commit -m "Update frontend and backend"
git push
# Both auto-deploy via GitHub Actions
```

---

## 🧪 Testing Commands

### Test Locally
```powershell
# Backend
cd backend
python app.py
# Visit: http://localhost:5000/api/health

# Frontend (new terminal)
npm run dev
# Visit: http://localhost:5173
```

### Test Production Build
```powershell
.\scripts\build-production.ps1
npm install -g serve
serve -s dist -p 3000
# Visit: http://localhost:3000
```

### Test Backend API
```powershell
# Health check
curl http://localhost:5000/api/health

# Dataset info
curl http://localhost:5000/api/dataset

# Production health check
curl https://your-backend.onrender.com/api/health
```

---

## 🛠️ Useful Scripts

```powershell
# Setup development environment
.\scripts\setup-dev.ps1

# Build for production
.\scripts\build-production.ps1

# Pre-deployment verification
.\scripts\check-deployment.ps1
```

---

## 📋 Environment Variables

### Backend (.env)
```env
FLASK_ENV=production
PORT=5000
CORS_ORIGINS=http://localhost:5173,https://your-app.vercel.app
```

### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend.onrender.com
```

---

## 🔗 Important URLs

### Development
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Dashboards
- Render: https://dashboard.render.com
- Vercel: https://vercel.com/dashboard
- GitHub: https://github.com/YOUR_USERNAME/YOUR_REPO

### Production (Update after deployment)
- Frontend: https://________________.vercel.app
- Backend: https://________________.onrender.com

---

## 🐛 Quick Troubleshooting

### CORS Error
```powershell
# Check Render environment variable CORS_ORIGINS includes your Vercel URL
# Format: http://localhost:5173,https://your-app.vercel.app
```

### Build Fails
```powershell
# Clear cache and rebuild
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
npm run build
```

### Backend Not Starting
```powershell
# Check Render logs
# Verify Procfile exists: web: cd backend && gunicorn app:app
# Verify requirements.txt has gunicorn==21.2.0
```

### Frontend Can't Connect
```powershell
# Check .env.production has correct backend URL
# Check browser console for API URL
# Verify backend is running (visit /api/health)
```

---

## 📚 Documentation Files

- **DEPLOYMENT_GUIDE.md** - Complete tutorial
- **DEPLOYMENT_CHECKLIST.md** - Step-by-step checklist
- **DEPLOYMENT_SUMMARY.md** - What we've done
- **README.md** - Project overview
- **This file** - Quick reference

---

## 💡 Pro Tips

1. **Always test locally first**: `.\scripts\check-deployment.ps1`
2. **Keep .env files secret**: Never commit them to Git
3. **Check logs**: Use Render & Vercel dashboards
4. **Free tier spins down**: First request takes 30-60s
5. **Use GitHub Actions**: Set up once, deploy automatically

---

## 🎯 Common Tasks

### Add New Environment Variable

**Backend (Render):**
1. Render Dashboard → Your Service → Environment
2. Add variable → Save (auto-redeploys)

**Frontend (Vercel):**
1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variable → Redeploy

### View Logs

**Render:** Dashboard → Your Service → Logs  
**Vercel:** Dashboard → Your Project → Deployments → Click deployment → Logs  
**GitHub Actions:** Repo → Actions tab

### Rollback Deployment

**Render:** Dashboard → Your Service → Events → Rollback to previous deploy  
**Vercel:** Dashboard → Your Project → Deployments → Promote to Production

---

## ⚡ Emergency Commands

### Backend Down?
```powershell
# Check health
curl https://your-backend.onrender.com/api/health

# View logs on Render dashboard
# Manual redeploy: Render Dashboard → Manual Deploy
```

### Frontend Issues?
```powershell
# Check build locally
npm run build

# Redeploy: Vercel Dashboard → Redeploy
# Or push to trigger GitHub Actions
```

### Both Down?
```powershell
# Check GitHub Actions status
# Check Render & Vercel dashboards
# Review recent commits for breaking changes
```

---

**Keep this file handy during deployment! 📌**
