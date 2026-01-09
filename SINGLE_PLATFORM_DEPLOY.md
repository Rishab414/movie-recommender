# Deploy Everything on Render (Single Platform)

## Overview
Deploy both frontend and backend on Render with a single web service.

---

## Step 1: Update Backend to Serve Frontend

### Modify `backend/server.js`:

Add these lines after cors registration (around line 7):

```javascript
const path = require('path');
const fs = require('fs');

// Serve static frontend files
const frontendPath = path.join(__dirname, '../frontend/build');
if (fs.existsSync(frontendPath)) {
  fastify.register(require('@fastify/static'), {
    root: frontendPath,
    prefix: '/'
  });
}

// Handle React routing - serve index.html for all non-API routes
fastify.get('/*', async (request, reply) => {
  const filePath = path.join(frontendPath, request.url);
  if (!filePath.startsWith(frontendPath)) {
    return reply.sendFile('index.html', frontendPath);
  }
  
  try {
    return reply.sendFile(request.url.slice(1), frontendPath);
  } catch (err) {
    return reply.sendFile('index.html', frontendPath);
  }
});
```

---

## Step 2: Update backend/package.json

Add dependencies:
```json
"dependencies": {
  "@fastify/cors": "^11.2.0",
  "@fastify/static": "^6.12.0",
  "fastify": "^5.6.2",
  "sqlite3": "^5.1.7"
}
```

Run: `npm install`

---

## Step 3: Create Build Script

Add to `backend/package.json` scripts:

```json
"scripts": {
  "build": "cd ../frontend && npm install && npm run build",
  "start": "node server.js",
  "dev": "node server.js"
}
```

---

## Step 4: Deploy to Render

### Create `render.yaml` in project root:

```yaml
services:
  - type: web
    name: movie-recommender
    env: node
    region: oregon
    plan: free
    buildCommand: |
      npm install && \
      cd frontend && npm install && npm run build && cd .. && \
      cd backend && npm install && cd ..
    startCommand: cd backend && npm start
    envVars:
      - key: NODE_ENV
        value: production
```

---

## Step 5: Push to GitHub & Deploy

```bash
git add .
git commit -m "Setup for single platform deployment on Render"
git push
```

Then on Render:
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your repository
4. Render will auto-detect `render.yaml`
5. Click "Create Web Service"

---

## That's It! 🎉

Your app will be deployed at:
- **Frontend**: https://your-app.onrender.com
- **API**: https://your-app.onrender.com/recommend

Everything on ONE platform!

---

## Note
- First deployment takes 5-10 minutes (building frontend)
- Subsequent deploys are faster
- Free tier has some limitations (spins down after 15 min inactivity)
- Upgrade to paid for always-on

