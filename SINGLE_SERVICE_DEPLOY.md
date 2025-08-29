# 🚀 Single Service Deployment on Render

## 🎯 Overview
Deploy both React frontend and Node.js backend as a single service on Render. The backend will serve the React app as static files.

## 📋 Benefits of Single Service Deployment
- ✅ Only one URL to manage
- ✅ No CORS issues
- ✅ Simpler configuration
- ✅ Lower cost (one service instead of two)
- ✅ Easier environment management

## 🚀 Deployment Steps

### Step 1: Push Your Updated Code
```bash
git add .
git commit -m "Configure for single service deployment"
git push origin main
```

### Step 2: Create Web Service on Render

1. **Go to Render Dashboard**
   - Visit [render.com](https://render.com)
   - Sign in with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your `feedback-app` repository

3. **Configure Service**
   ```
   Name: feedback-app
   Region: Any (closest to your users)
   Branch: main
   Root Directory: (leave empty)
   Runtime: Node
   Build Command: npm install && npm run build && cd backend && npm install
   Start Command: cd backend && npm start
   Instance Type: Free
   ```

4. **Add Environment Variables**
   ```
   MONGODB_URI = mongodb+srv://mohitsp54:VHRlrEyqeDDC3Cn2@cluster0.xkawmw0.mongodb.net/feedback?retryWrites=true&w=majority&appName=Cluster0
   NODE_ENV = production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (10-15 minutes for first build)

### Step 3: Access Your App
- Your app will be available at: `https://feedback-app-xxxx.onrender.com`
- Both frontend and API are served from the same URL
- API endpoints: `https://feedback-app-xxxx.onrender.com/api/feedback`

## 🏗️ How It Works

### Build Process
1. Render installs frontend dependencies: `npm install`
2. Builds React app: `npm run build` (creates `/build` folder)
3. Installs backend dependencies: `cd backend && npm install`
4. Starts backend server: `cd backend && npm start`

### Runtime
1. Backend serves static React files from `/build` folder
2. API routes are handled by Express (`/api/*`)
3. All other routes serve the React app (SPA routing)

### URL Structure
```
https://your-app.onrender.com/           → React App
https://your-app.onrender.com/api/feedback → API Endpoint
https://your-app.onrender.com/api/health   → Health Check
```

## 🔧 Configuration Files

### Updated Files:
- ✅ `.env.production` - API URL set to `/api` (relative)
- ✅ `backend/server.js` - Serves static React files
- ✅ `render.yaml` - Single service configuration
- ✅ `package.json` - Build scripts updated

## 🎉 Advantages

### Development vs Production
- **Development**: Frontend (port 3000) + Backend (port 5000)
- **Production**: Single service serves everything

### No CORS Issues
- Since frontend and backend are on same domain
- No need for complex CORS configuration

### Simplified Environment
- Only one environment variable needed: `MONGODB_URI`
- API URL is automatically correct (relative paths)

## 🆘 Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Ensure all dependencies are in package.json
- Verify build commands are correct

### App Not Loading
- Check if service status is "Live" (green)
- Visit `/api/health` to test backend
- Check browser console for errors

### API Not Working
- Verify MongoDB connection string
- Check backend logs in Render dashboard
- Test API endpoints directly

## 📝 Commands Summary

```bash
# Local development
npm start                    # Start React dev server
npm run start-backend       # Start backend server

# Production build (local testing)
npm run build               # Build React app
npm run start-production    # Start backend with static files

# Deploy
git push origin main        # Auto-deploy on Render
```

## 🎯 Final Result
- **Single URL**: `https://feedback-app-xxxx.onrender.com`
- **React App**: Served from root path
- **API**: Available at `/api/feedback`
- **Health Check**: Available at `/api/health`

Your full-stack app is now deployed as a single service! 🚀
