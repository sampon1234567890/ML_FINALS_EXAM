# 🚀 Quick Deployment Checklist

Use this checklist to ensure smooth deployment.

## ☑️ Pre-Deployment Checklist

### Code Preparation
- [ ] All changes committed to Git
- [ ] Code pushed to GitHub repository
- [ ] `.env` files added to `.gitignore`
- [ ] `requirements.txt` up to date
- [ ] `package.json` dependencies complete

### Backend Configuration
- [ ] `backend/.env.example` created
- [ ] `Procfile` exists in root
- [ ] `render.yaml` configured
- [ ] Gunicorn installed in requirements.txt
- [ ] CORS settings configured

### Frontend Configuration
- [ ] `.env.production` created (with placeholder)
- [ ] `vercel.json` configured
- [ ] API utility uses environment variables
- [ ] Build tested locally: `npm run build`

## ☑️ Deployment Steps

### 1. Backend Deployment (Render)
- [ ] Render account created
- [ ] New Web Service created
- [ ] GitHub repository connected
- [ ] Build command: `cd backend && pip install -r requirements.txt`
- [ ] Start command: `cd backend && gunicorn app:app`
- [ ] Environment variables set:
  - [ ] `FLASK_ENV=production`
  - [ ] `PORT=5000`
  - [ ] `CORS_ORIGINS=http://localhost:5173`
- [ ] Deployment successful (check logs)
- [ ] Backend URL copied: `___________________________`
- [ ] Health check passed: `/api/health`

### 2. Frontend Deployment (Vercel)
- [ ] Backend URL added to `.env.production`
- [ ] Changes committed and pushed
- [ ] Vercel account created
- [ ] New Project created
- [ ] GitHub repository connected
- [ ] Framework preset: Vite
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Environment variable `VITE_API_URL` set
- [ ] Deployment successful
- [ ] Frontend URL copied: `___________________________`

### 3. CORS Update
- [ ] Vercel URL added to Render's `CORS_ORIGINS`
- [ ] Format: `http://localhost:5173,https://your-app.vercel.app`
- [ ] Render service redeployed
- [ ] CORS working (check browser console)

## ☑️ Post-Deployment Verification

### Backend Tests
- [ ] Health check: `GET /api/health`
- [ ] Dataset info: `GET /api/dataset`
- [ ] Sample data: `GET /api/dataset/sample`

### Frontend Tests
- [ ] Homepage loads
- [ ] Navigation works
- [ ] All 6 model pages accessible:
  - [ ] Linear Regression
  - [ ] Naive Bayes
  - [ ] K-Nearest Neighbors
  - [ ] Support Vector Machine
  - [ ] Decision Tree
  - [ ] Artificial Neural Network
- [ ] Form submissions work
- [ ] Predictions display correctly
- [ ] Clear Form buttons work
- [ ] No console errors

### Integration Tests
- [ ] API calls successful (check Network tab)
- [ ] CORS headers present
- [ ] Response times acceptable (<3s)
- [ ] Error handling works

## ☑️ Optional: GitHub Actions Setup

### Secrets Configuration
- [ ] GitHub repository → Settings → Secrets
- [ ] Render secrets added:
  - [ ] `RENDER_SERVICE_ID`
  - [ ] `RENDER_API_KEY`
  - [ ] `RENDER_SERVICE_URL`
- [ ] Vercel secrets added:
  - [ ] `VERCEL_TOKEN`
  - [ ] `VERCEL_ORG_ID`
  - [ ] `VERCEL_PROJECT_ID`
  - [ ] `BACKEND_URL`

### Workflow Tests
- [ ] Backend workflow runs on push
- [ ] Frontend workflow runs on push
- [ ] Deployments successful
- [ ] Automatic updates working

## ☑️ Documentation

- [ ] `DEPLOYMENT_GUIDE.md` reviewed
- [ ] Deployment URLs documented
- [ ] Team members notified
- [ ] Instructor/stakeholders informed

## 📝 Deployment Info

**Date Deployed**: ___/___/______

**Deployed By**: _________________

**Backend URL**: https://___________________________

**Frontend URL**: https://___________________________

**Repository**: https://github.com/___________________________

## 🐛 Issues Encountered

| Issue | Solution | Status |
|-------|----------|--------|
|       |          | ☐      |
|       |          | ☐      |
|       |          | ☐      |

## 🎉 Deployment Complete!

Once all items are checked, your ML web application is live and ready for use!

**Next Steps:**
1. Share URLs with users/instructors
2. Monitor performance
3. Collect feedback
4. Plan updates/improvements
