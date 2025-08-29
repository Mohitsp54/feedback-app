const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const feedbackRoutes = require('./routes/feedback');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://feedback-frontend.onrender.com',
        'https://your-frontend-app.onrender.com',
        /\.onrender\.com$/
      ]
    : ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB Atlas connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/feedback', feedbackRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Feedback API is running with MongoDB Atlas!',
    environment: process.env.NODE_ENV || 'development'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Connected to MongoDB Atlas database');
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
