const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import all routes
const authRoutes = require('./routes/authRoutes');
const codingRoutes = require('./routes/codingRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const aiChatRoutes = require('./routes/aiChatRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const progressRoutes = require('./routes/progressRoutes');
const companyRoutes = require('./routes/companyRoutes');

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration for production
app.use(cors({
  origin: '*', // Allows requests from any origin (your deployed frontend)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to parse JSON
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'AI Placement Portal API is running',
    status: 'healthy',
    version: '1.0.0'
  });
});

// Register all routes
app.use('/api/auth', authRoutes);
app.use('/api/coding', codingRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/ai', aiChatRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/companies', companyRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}`);
});