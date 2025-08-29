# Feedback Hub - MERN Stack Application

A full-stack feedback management application built with React, Node.js, Express, and MongoDB.

## Features

- ✅ Add feedback with title, description, and category
- ✅ View feedback grouped by categories (Bug, Feature, Improvement)
- ✅ Search and filter feedback
- ✅ Sort by newest/oldest
- ✅ Upvote feedback items
- ✅ Responsive design
- ✅ Real-time updates
- ✅ Form validation and error handling

## Tech Stack

**Frontend:**
- React 19
- Axios for API calls
- React Toastify for notifications
- CSS3 with modern styling

**Backend:**
- Node.js & Express
- MongoDB with Mongoose
- CORS enabled
- Input validation

## Local Development

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the React development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### Frontend (Netlify)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Add environment variable: `REACT_APP_API_URL` with your backend URL

3. **Configure environment variables:**
   - In Netlify dashboard, go to Site settings > Environment variables
   - Add: `REACT_APP_API_URL=https://your-backend-url.com/api`

### Backend (Heroku/Railway/Render)

1. **For Heroku:**
   ```bash
   # Create Heroku app
   heroku create your-app-name

   # Set environment variables
   heroku config:set MONGODB_URI=your_mongodb_connection_string
   heroku config:set NODE_ENV=production

   # Deploy
   git subtree push --prefix backend heroku main
   ```

2. **For Railway:**
   - Connect your GitHub repository
   - Select the `backend` folder as root
   - Add environment variables in Railway dashboard

3. **For Render:**
   - Connect your GitHub repository
   - Set root directory to `backend`
   - Add environment variables in Render dashboard

## Environment Variables

### Frontend (.env.production)
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=production
```

## API Endpoints

- `GET /api/feedback` - Get all feedback (with optional query params)
- `POST /api/feedback` - Create new feedback
- `PUT /api/feedback/:id/vote` - Upvote feedback

## Project Structure

```
feedback-app/
├── backend/
│   ├── models/
│   │   └── Feedback.js
│   ├── routes/
│   │   └── feedback.js
│   ├── server.js
│   └── package.json
├── src/
│   ├── App.js
│   ├── App.css
│   └── index.js
├── public/
│   ├── _redirects
│   └── index.html
├── netlify.toml
└── package.json
```

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
