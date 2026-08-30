const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  college: { type: String, default: '' },
  progress: {
    codingScore: { type: Number, default: 0 },
    aptitudeScore: { type: Number, default: 0 },
    problemsSolved: { type: Number, default: 0 },
    testsTaken: { type: Number, default: 0 },
    aptitudeHistory: [{ subject: String, score: Number, date: Date }]
  },
  streak: {
    current: { type: Number, default: 0 },
    longest: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now }
  },
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);