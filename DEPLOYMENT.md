# Deployment Guide

## Option 1: Deploy Frontend on Vercel (Recommended)

### Steps:

1. **Sign up on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub account
   - Authorize Vercel to access your repositories

2. **Deploy Frontend**
   - Click "New Project"
   - Select your `movie-recommender` repository
   - Framework Preset: **React**
   - Root Directory: `frontend`
   - Environment Variables: (leave empty for now)
   - Click "Deploy"

3. **Configure API URL**
   - After deployment, go to Project Settings
   - Go to "Environment Variables"
   - Add new variable:
     - Name: `REACT_APP_API_URL`
     - Value: `https://your-backend-url.com` (you'll get this from backend deployment)
   - Redeploy

---

## Option 2: Deploy Backend on Render

### Steps:

1. **Sign up on Render**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub account

2. **Deploy Backend**
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Configuration:
     - **Name**: `movie-recommender-api`
     - **Environment**: `Node`
     - **Region**: Choose closest to you
     - **Branch**: `main`
     - **Build Command**: `cd backend && npm install`
     - **Start Command**: `cd backend && npm start`
   - Click "Create Web Service"

3. **Get Backend URL**
   - Wait for deployment to complete
   - Your backend URL will be: `https://movie-recommender-api.onrender.com`

---

## Option 3: Deploy Both to Render (Full-Stack)

If you want everything in one place, deploy to Render with a custom start script.

### Steps:

1. Update `backend/package.json`:
   - Change start script to: `"start": "node server.js"`

2. Create a `start.sh` file in root:
   ```bash
   #!/bin/bash
   cd backend
   npm install
   npm start
   ```

3. On Render:
   - Select Node environment
   - Build Command: `npm install`
   - Start Command: `node backend/server.js`

---

## Updating Frontend to Use Deployed Backend

In `frontend/src/App.js`, update the fetch URL:

```javascript
// Change from:
const response = await fetch('/recommend', {

// To:
const response = await fetch('https://your-backend-url.com/recommend', {
```

---

## Testing Deployed Links

Once deployed, test with:
```bash
curl -X POST https://your-deployed-backend.com/recommend \
  -H "Content-Type: application/json" \
  -d '{"userInput":"action movies"}'
```

---

## Deployed Links (After Deployment)

- **Frontend**: https://your-project.vercel.app
- **Backend API**: https://movie-recommender-api.onrender.com

---

## Troubleshooting

### Backend not connecting:
- Check CORS is enabled in Render environment
- Verify API URL in frontend environment variables
- Check Render logs for errors

### Frontend not loading:
- Ensure backend URL is correct
- Check browser console for errors
- Verify React build completed

### Database issues:
- Render provides ephemeral storage (deleted on redeploy)
- For persistent data, upgrade to paid plan or use external database

