# Deploy Feedback App to Render - Complete Guide

## 🎯 Overview
This guide will help you deploy both frontend (React) and backend (Node.js/Express) to Render using their free tier.

## 📋 Prerequisites
- GitHub account with your code pushed
- Render account (free): [render.com](https://render.com)
- MongoDB Atlas database URL

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Your Repository
Ensure your code is pushed to GitHub with all the recent changes.

### Step 2: Deploy Backend First

1. **Go to Render Dashboard**
   - Visit [render.com](https://render.com)
   - Sign in with your GitHub account

2. **Create New Web Service**
   - Click "New +" button
   - Select "Web Service"

3. **Connect Repository**
   - Choose "Build and deploy from a Git repository"
   - Click "Connect" next to your `feedback-app` repository

4. **Configure Backend Service**
   ```
   Name: feedback-backend
   Region: Any (closest to your users)
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

5. **Add Environment Variables**
   - Click "Advanced" section
   - Add these environment variables:
     ```
     MONGODB_URI = your_mongodb_atlas_connection_string
     NODE_ENV = production
     ```

6. **Deploy Backend**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Note your backend URL: `https://feedback-backend-xxxx.onrender.com`

### Step 3: Deploy Frontend

1. **Create Another Web Service**
   - Go back to Render dashboard
   - Click "New +" → "Web Service"

2. **Connect Same Repository**
   - Select your `feedback-app` repository again

3. **Configure Frontend Service**
   ```
   Name: feedback-frontend
   Region: Same as backend
   Branch: main
   Root Directory: (leave empty - use root)
   Runtime: Node
   Build Command: npm install && npm run build
   Start Command: serve -s build
   Instance Type: Free
   ```

4. **Add Environment Variables**
   - In "Advanced" section:
     ```
     REACT_APP_API_URL = https://your-backend-url.onrender.com/api
     ```
   - Replace `your-backend-url` with actual backend URL from Step 2

5. **Deploy Frontend**
   - Click "Create Web Service"
   - Wait for deployment

### Step 4: Update CORS Configuration

1. **Get Your Frontend URL**
   - Note your frontend URL: `https://feedback-frontend-xxxx.onrender.com`

2. **Update Backend CORS** (if needed)
   - The backend is already configured to accept `.onrender.com` domains
   - If you have issues, you can manually update `backend/server.js`

### Step 5: Install Serve Package

Add serve package to your main package.json for frontend deployment:

1. **Update package.json dependencies:**
   ```json
   "dependencies": {
     ...existing dependencies,
     "serve": "^14.2.1"
   }
   ```

## 🔧 Configuration Files Created

### `render.yaml` (Optional - for Blueprint deployment)
```yaml
services:
  - type: web
    name: feedback-backend
    env: node
    plan: free
    buildCommand: cd backend && npm install
    startCommand: cd backend && npm start
    
  - type: web
    name: feedback-frontend
    env: static
    plan: free
    buildCommand: npm install && npm run build
    staticPublishPath: ./build
```

## 🎉 Final Steps

### Test Your Deployment
1. **Visit your frontend URL**
2. **Test all features:**
   - Add new feedback
   - Search and filter
   - Vote on items
   - Check responsive design

### Monitor Your Apps
- Both services will be visible in your Render dashboard
- Check logs if you encounter any issues
- Free tier services sleep after 15 minutes of inactivity

## 🆘 Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Verify backend CORS configuration includes your frontend domain
   - Check browser console for specific error messages

2. **API Connection Failed**
   - Verify `REACT_APP_API_URL` environment variable is correct
   - Ensure backend service is running (green status in Render)

3. **Build Failures**
   - Check build logs in Render dashboard
   - Ensure all dependencies are listed in package.json

4. **Database Connection Issues**
   - Verify MongoDB Atlas connection string
   - Check if IP whitelist includes 0.0.0.0/0 (allow all IPs)

### Render Free Tier Limitations:
- Services sleep after 15 minutes of inactivity
- Cold start may take 30+ seconds
- 750 hours/month limit (shared across all services)

## 📝 Environment Variables Summary

### Backend:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/feedback
NODE_ENV=production
```

### Frontend:
```
REACT_APP_API_URL=https://your-backend-name.onrender.com/api
```

## 🎯 Final URLs
After successful deployment, you'll have:
- **Frontend**: `https://feedback-frontend-xxxx.onrender.com`
- **Backend API**: `https://feedback-backend-xxxx.onrender.com`

Your MERN stack application is now live on Render! 🚀
