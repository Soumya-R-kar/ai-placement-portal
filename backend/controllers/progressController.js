const User = require('../models/User');

exports.updateStreak = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const now = new Date();
    const lastActive = new Date(user.streak.lastActive);
    
    const daysDiff = Math.floor((now - lastActive) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 1) {
      user.streak.current += 1;
      if (user.streak.current > user.streak.longest) {
        user.streak.longest = user.streak.current;
      }
    } else if (daysDiff > 1) {
      user.streak.current = 1;
    }
    
    user.streak.lastActive = now;
    await user.save();
    
    res.json({ success: true, streak: user.streak.current, level: user.level, xp: user.xp });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update streak' });
  }
};

exports.addCodingProgress = async (req, res) => {
  try {
    const { points } = req.body;
    const user = await User.findById(req.user.id);
    
    user.progress.problemsSolved += 1;
    user.progress.codingScore += points;
    user.xp += points;
    
    // Level up every 100 XP
    const newLevel = Math.floor(user.xp / 100) + 1;
    if (newLevel > user.level) {
      user.level = newLevel;
    }
    
    await user.save();
    
    res.json({ success: true, progress: user.progress, level: user.level, xp: user.xp });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update progress' });
  }
};

exports.addAptitudeProgress = async (req, res) => {
  try {
    const { subject, score } = req.body;
    const user = await User.findById(req.user.id);
    
    user.progress.testsTaken += 1;
    user.progress.aptitudeHistory.push({ subject, score, date: new Date() });
    user.xp += Math.round(score * 2);
    
    const newLevel = Math.floor(user.xp / 100) + 1;
    if (newLevel > user.level) {
      user.level = newLevel;
    }
    
    await user.save();
    
    res.json({ success: true, progress: user.progress, level: user.level });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update aptitude progress' });
  }
};