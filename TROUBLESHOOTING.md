# 🚨 Troubleshooting Deployment Issues

## Common Problems & Solutions

### 1. ❌ Feedbacks Not Fetching

**Symptoms:**
- Empty state shows "No feedback yet"
- Loading never completes
- Console errors about network requests

**Solutions:**

#### Check API URL
1. Open browser console (F12) on your deployed frontend
2. Look for debug info showing the API URL
3. Verify it matches your deployed backend URL

#### Verify Backend Status
1. Visit your backend URL directly: `https://your-backend-name.onrender.com`
2. Should show: `{"message": "Feedback API is running with MongoDB Atlas!"}`
3. Check health endpoint: `https://your-backend-name.onrender.com/health`

#### Fix Environment Variables
1. In Render dashboard → Frontend service → Environment
2. Ensure `REACT_APP_API_URL` is set to: `https://your-backend-name.onrender.com/api`
3. Redeploy frontend after changing environment variables

### 2. ❌ Feedback Submission Failing

**Symptoms:**
- Form submits but shows error toast
- Console shows CORS or network errors

**Solutions:**

#### Check CORS Configuration
1. Open browser console on your frontend
2. Look for CORS errors
3. Backend now allows all origins for debugging

#### Verify Backend Logs
1. Render dashboard → Backend service → Logs
2. Look for request logs when submitting
3. Check for MongoDB connection issues

### 3. ❌ Database Connection Issues

**Symptoms:**
- Backend logs show MongoDB connection errors
- Health endpoint shows "Disconnected"

**Solutions:**

#### Check MongoDB Atlas
1. MongoDB Atlas → Network Access
2. Ensure IP whitelist includes `0.0.0.0/0` (allow all)
3. Verify connection string is correct

#### Verify Environment Variables
1. Render dashboard → Backend service → Environment
2. Check `MONGODB_URI` is set correctly
3. Should be: `mongodb+srv://mohitsp54:VHRlrEyqeDDC3Cn2@cluster0.xkawmw0.mongodb.net/feedback?retryWrites=true&w=majority&appName=Cluster0`

## 🔧 Quick Fixes

### Force Redeploy
```bash
# Make a small change and push
git commit --allow-empty -m "Force redeploy"
git push origin main
```

### Test API Directly
```bash
# Test backend directly
curl https://your-backend-name.onrender.com/health

# Test feedback endpoint
curl https://your-backend-name.onrender.com/api/feedback
```

### Check Frontend Build
```bash
# Rebuild locally to test
npm run build
npx serve -s build
```

## 🐛 Debug Steps

### 1. Check Backend Logs
1. Render dashboard → Backend service → Logs
2. Look for:
   - MongoDB connection success/failure
   - Request logs with origins
   - Any error messages

### 2. Check Frontend Console
1. Open deployed frontend
2. Press F12 → Console tab
3. Look for:
   - API URL in debug info
   - Network errors
   - CORS errors

### 3. Test Each Service
1. **Backend health:** `https://your-backend.onrender.com/health`
2. **API endpoint:** `https://your-backend.onrender.com/api/feedback`
3. **Frontend loads:** `https://your-frontend.onrender.com`

## 🎯 Most Common Issues

1. **Wrong API URL** - Frontend pointing to localhost instead of deployed backend
2. **Environment variables not set** - Missing `REACT_APP_API_URL`
3. **CORS issues** - Backend not allowing frontend domain
4. **MongoDB whitelist** - Database not allowing Render's IPs
5. **Cold start delays** - First request takes 30+ seconds

## 💡 Pro Tips

- Always redeploy frontend after changing environment variables
- Check both services are "Live" (green) in Render dashboard
- Free tier services sleep after 15 minutes - first request is slow
- Use health endpoint to verify backend is running
- Console logs show exactly what's happening

## 🆘 Still Having Issues?

If none of these solutions work:

1. Share the exact error messages from console
2. Verify both service URLs are accessible
3. Check if both services show "Live" status in Render
4. Try deploying again with the updated CORS configuration

The improved logging should now show exactly what's happening in both frontend console and backend logs!
