# 🚀 ML Finals Exam - Deployment Guide

Complete step-by-step guide to deploy your ML web application to production using **Render (Backend)** and **Vercel (Frontend)**.

---

## 📋 Prerequisites

Before you begin, make sure you have:

- ✅ GitHub account
- ✅ Git installed and project pushed to GitHub
- ✅ Render account (free tier available at https://render.com)
- ✅ Vercel account (free tier available at https://vercel.com)

---

## 🎯 Deployment Overview

**Stack:**
- **Backend**: Flask API on Render (Free tier)
- **Frontend**: React/Vite on Vercel (Free tier)
- **CI/CD**: GitHub Actions for automatic deployments

**Total Deployment Time**: ~20 minutes

---

## 📦 Part 1: Prepare Your Code (Already Done!)

Your code is already configured for production with:

✅ Backend environment variables (`.env.example`)  
✅ Frontend API URL configuration  
✅ CORS setup for production  
✅ Gunicorn production server  
✅ Deployment configuration files  

---

## 🔧 Part 2: Deploy Backend to Render

### Step 1: Push Code to GitHub

```powershell
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Ready for deployment"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 2: Create Render Web Service

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:

   **Basic Settings:**
   - **Name**: `ml-finals-backend` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: Leave empty
   - **Runtime**: `Python 3`
   
   **Build & Deploy:**
   - **Build Command**: `cd backend && pip install -r requirements.txt`
   - **Start Command**: `cd backend && gunicorn app:app`
   
   **Plan:**
   - Select **Free** tier

5. Click **"Advanced"** to add environment variables:

   ```
   FLASK_ENV = production
   PORT = 5000
   CORS_ORIGINS = http://localhost:5173
   ```
   
   > ⚠️ **Note**: We'll update `CORS_ORIGINS` later with your Vercel URL

6. Click **"Create Web Service"**

### Step 3: Wait for Deployment

- Render will build and deploy your backend (~5-10 minutes)
- Watch the logs for any errors
- Once deployed, you'll see: ✅ **"Live"** status

### Step 4: Get Your Backend URL

- Copy your backend URL (e.g., `https://ml-finals-backend.onrender.com`)
- Test it by visiting: `https://YOUR_URL.onrender.com/api/health`
- You should see: `{"status": "healthy"}`

---

## 🌐 Part 3: Deploy Frontend to Vercel

### Step 1: Update Frontend Environment Variable

1. Create `.env.production` in the root directory (already created!)
2. Update it with your Render backend URL:

```env
VITE_API_URL=https://YOUR_BACKEND_URL.onrender.com
```

**Example:**
```env
VITE_API_URL=https://ml-finals-backend.onrender.com
```

3. Commit and push the change:

```powershell
git add .
git commit -m "Update backend URL for production"
git push
```

### Step 2: Deploy to Vercel

**Option A: Deploy via Vercel Dashboard (Recommended)**

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure the project:

   **Framework Preset**: `Vite`  
   **Root Directory**: `./`  
   **Build Command**: `npm run build`  
   **Output Directory**: `dist`

5. Add Environment Variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://YOUR_BACKEND_URL.onrender.com`

6. Click **"Deploy"**

**Option B: Deploy via Vercel CLI**

```powershell
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel --prod
```

### Step 3: Get Your Frontend URL

- Vercel will provide a URL like: `https://your-project.vercel.app`
- Your app is now live! 🎉

---

## 🔄 Part 4: Update CORS Settings

Now that you have both URLs, update the backend CORS settings:

1. Go to Render Dashboard → Your Web Service
2. Navigate to **"Environment"** tab
3. Update `CORS_ORIGINS`:

```
http://localhost:5173,https://your-project.vercel.app
```

4. Save changes (Render will redeploy automatically)

---

## 🤖 Part 5: Set Up GitHub Actions (Optional)

For automatic deployments on every push:

### Step 1: Get Render API Key

1. Go to Render Dashboard → Account Settings → API Keys
2. Create a new API key
3. Copy the key

### Step 2: Get Vercel Tokens

```powershell
# Install Vercel CLI if not installed
npm install -g vercel

# Login and get tokens
vercel login

# Link project to get IDs
vercel link
```

This will create `.vercel/project.json` with:
- `projectId`
- `orgId`

### Step 3: Add Secrets to GitHub

1. Go to your GitHub repository → Settings → Secrets and variables → Actions
2. Add these secrets:

**Render Secrets:**
- `RENDER_SERVICE_ID`: From Render dashboard URL
- `RENDER_API_KEY`: API key from Step 1
- `RENDER_SERVICE_URL`: Your backend URL

**Vercel Secrets:**
- `VERCEL_TOKEN`: From Vercel account settings
- `VERCEL_ORG_ID`: From `.vercel/project.json`
- `VERCEL_PROJECT_ID`: From `.vercel/project.json`
- `BACKEND_URL`: Your Render backend URL

### Step 4: Test Automatic Deployment

```powershell
# Make a small change
echo "# Test" >> README.md

# Commit and push
git add .
git commit -m "Test CI/CD"
git push
```

GitHub Actions will automatically deploy your changes!

---

## ✅ Part 6: Verify Deployment

### Backend Health Check

```powershell
curl https://YOUR_BACKEND_URL.onrender.com/api/health
```

Expected response:
```json
{"status": "healthy"}
```

### Frontend Test

1. Visit your Vercel URL
2. Navigate to each model page
3. Try making predictions
4. Check browser console for errors

---

## 🐛 Troubleshooting

### Issue: CORS Error in Browser

**Solution**: Make sure `CORS_ORIGINS` in Render includes your Vercel URL:
```
http://localhost:5173,https://your-project.vercel.app
```

### Issue: Backend Not Responding

**Check Render Logs**:
1. Go to Render Dashboard → Your Service → Logs
2. Look for errors in deployment or runtime logs

**Common fixes**:
- Ensure `requirements.txt` is in `backend/` folder
- Verify build command: `cd backend && pip install -r requirements.txt`
- Check start command: `cd backend && gunicorn app:app`

### Issue: Frontend Can't Connect to Backend

**Check API URL**:
1. Open browser DevTools → Network tab
2. Check if API requests go to correct URL
3. Verify `.env.production` has correct `VITE_API_URL`

### Issue: 500 Internal Server Error

**Check Backend Logs** on Render for Python errors

**Common causes**:
- Missing dataset files
- Missing dependencies
- Database connection issues

### Issue: Free Tier Spin-Down

**Note**: Render's free tier spins down after 15 minutes of inactivity
- First request may take 30-60 seconds
- Subsequent requests will be fast
- Consider upgrading for production use

---

## 📊 Monitoring & Maintenance

### Monitor Backend

- **Render Dashboard**: View logs, metrics, and deployment history
- **Health Endpoint**: `https://YOUR_URL.onrender.com/api/health`

### Monitor Frontend

- **Vercel Dashboard**: View deployments, analytics, and logs
- **Analytics**: Enable Vercel Analytics for visitor insights

### Update Deployment

**Backend**: Push to GitHub → Render auto-deploys  
**Frontend**: Push to GitHub → Vercel auto-deploys

---

## 🔒 Security Best Practices

1. **Never commit `.env` files** (already in `.gitignore`)
2. **Use environment variables** for sensitive data
3. **Enable HTTPS** (automatic on Render & Vercel)
4. **Restrict CORS** to specific domains
5. **Keep dependencies updated**

---

## 💰 Cost Breakdown

**Free Tier Limits:**

**Render Free Tier:**
- ✅ 750 hours/month
- ✅ Automatic HTTPS
- ⚠️ Spins down after 15 min inactivity

**Vercel Free Tier:**
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS & CDN

**Upgrade Options** (if needed):
- Render Starter: $7/month (no spin-down)
- Vercel Pro: $20/month (advanced features)

---

## 🎓 Next Steps

After deployment:

1. **Test all ML models** with real data
2. **Share your URL** with users/instructors
3. **Monitor performance** via dashboards
4. **Collect feedback** and iterate
5. **Add custom domain** (optional)

---

## 📚 Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Guide](https://docs.github.com/en/actions)
- [Flask Deployment Best Practices](https://flask.palletsprojects.com/en/latest/deploying/)

---

## 🆘 Need Help?

**Render Issues**: https://community.render.com  
**Vercel Issues**: https://vercel.com/support  
**GitHub Actions**: https://github.community

---

## ✨ Congratulations!

Your ML web application is now deployed and accessible worldwide! 🌍

**Your Live URLs:**
- Frontend: `https://your-project.vercel.app`
- Backend: `https://your-backend.onrender.com`

Share your project and showcase your work! 🚀
