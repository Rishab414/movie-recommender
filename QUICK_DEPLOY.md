# 🚀 Quick Deployment Steps

## Deploy Backend on Render (FREE)

### 1. Go to [Render.com](https://render.com)
- Sign up with GitHub
- Click "New +" → "Web Service"
- Connect your `movie-recommender` repository

### 2. Configure:
```
Name: movie-recommender-api
Environment: Node
Region: Choose closest to you
Build Command: cd backend && npm install
Start Command: cd backend && npm start
```

### 3. Wait for Deployment
- Status will show "Live" when ready
- Copy your backend URL (format: `https://movie-recommender-api.onrender.com`)

---

## Deploy Frontend on Vercel (FREE)

### 1. Go to [Vercel.com](https://vercel.com)
- Sign in with GitHub
- Click "Add New..." → "Project"
- Import your repository

### 2. Configure:
```
Framework: React
Root Directory: frontend
Environment Variables:
  REACT_APP_API_URL = https://your-backend-url.onrender.com
```

### 3. Deploy
- Click "Deploy"
- Get your frontend URL (format: `https://your-project.vercel.app`)

---

## Final Steps

1. **Update Frontend API URL**
   - In `frontend/src/App.js` line 20:
   ```javascript
   const response = await fetch(process.env.REACT_APP_API_URL + '/recommend', {
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update API URL for production"
   git push
   ```

3. **Redeploy on Vercel**
   - Push triggers automatic redeploy

---

## Your Deployed Links

Once deployed, you'll have:
- **Frontend**: https://your-project.vercel.app
- **Backend**: https://movie-recommender-api.onrender.com

Both will be accessible globally! 🌍

