const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Simple auth middleware (no external file needed)
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token provided' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.user = { id: decoded.id || decoded.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Save aptitude test progress
router.post('/aptitude', auth, async (req, res) => {
  try {
    const { subject, score, correct, total } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Initialize progress object if it doesn't exist
    if (!user.progress) {
      user.progress = {
        problemsSolved: 0,
        aptitudeScore: 0,
        testsTaken: 0,
        aptitudeHistory: []
      };
    }

    // Update aptitude stats
    user.progress.testsTaken += 1;
    
    // Calculate new average score
    const totalTests = user.progress.testsTaken;
    const previousTotal = user.progress.aptitudeScore * (totalTests - 1);
    user.progress.aptitudeScore = Math.round((previousTotal + score) / totalTests);

    // Add to history
    if (!user.progress.aptitudeHistory) {
      user.progress.aptitudeHistory = [];
    }
    user.progress.aptitudeHistory.push({
      subject,
      score,
      correct,
      total,
      date: new Date()
    });

    // Add XP based on score
    const xpEarned = Math.round(score / 10);
    user.xp = (user.xp || 0) + xpEarned;
    
    // Level up logic
    user.level = Math.floor(user.xp / 100) + 1;

    await user.save();

    res.json({ 
      message: 'Progress saved successfully',
      progress: user.progress,
      xpEarned,
      newLevel: user.level
    });
  } catch (error) {
    console.error('Progress save error:', error);
    res.status(500).json({ message: 'Server error saving progress' });
  }
});

// Get user progress
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('progress xp level streak');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ 
      progress: user.progress || {}, 
      xp: user.xp || 0, 
      level: user.level || 1, 
      streak: user.streak 
    });
  } catch (error) {
    console.error('Progress fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;