const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { 
    type: String, 
    enum: ['Easy', 'Medium', 'Hard'], 
    required: true 
  },
  language: { 
    type: String, 
    default: 'python' 
  },
  starterCode: { type: String, required: true },
  testCases: [
    {
      input: String,
      expectedOutput: String
    }
  ],
  points: { type: Number, default: 10 }
}, { timestamps: true });

module.exports = mongoose.model('Problem', ProblemSchema);