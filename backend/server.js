const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const feedbackRoutes = require('./routes/feedback');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS - since we're serving frontend and backend together, we don't need complex CORS
app.use(cors());
app.use(express.json());

// Serve static files from React build (in production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
}

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB Atlas connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// API routes
app.use('/api/feedback', feedbackRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Serve React app for all non-API routes (in production)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({ 
      message: 'Feedback API is running with MongoDB Atlas!',
      environment: process.env.NODE_ENV || 'development'
    });
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Connected to MongoDB Atlas database');
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
