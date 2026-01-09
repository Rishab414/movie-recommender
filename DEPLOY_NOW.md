# 🚀 Deploy Everything on Render (Single Platform)

## Super Simple: 3 Steps Only!

### Step 1: Go to Render
- Visit https://render.com
- Sign in with GitHub

### Step 2: Create Web Service
1. Click "New +" → "Web Service"
2. Select your `movie-recommender` repository
3. Render will auto-detect `render.yaml` ✅
4. Click "Create Web Service"

### Step 3: Wait & Done! 🎉
- Deployment takes 5-10 minutes (building frontend)
- Once "Live" status appears, your app is ready!

---

## Your Deployed App

Once deployed, access at:
```
https://your-app-name.onrender.com
```

- **Frontend**: Loads instantly
- **API Endpoint**: `/recommend`
- **Everything together**: One platform! ✨

---

## Testing

Open in browser:
```
https://your-app-name.onrender.com
```

Or test API:
```bash
curl -X POST https://your-app-name.onrender.com/recommend \
  -H "Content-Type: application/json" \
  -d '{"userInput":"action movies"}'
```

---

## What Happens:
1. Render detects `render.yaml`
2. Installs frontend dependencies
3. Builds React app to `/frontend/build`
4. Installs backend dependencies
5. Serves everything from backend on port 5000

---

## Notes:
- Free tier has some limitations (restarts after 15 min inactivity)
- First deploy takes longer (building frontend)
- Subsequent updates are instant if only backend changes
- Everything runs on ONE web service! 🎯

---

**That's all you need to do!** Push to GitHub, and Render handles the rest automatically. 🚀

