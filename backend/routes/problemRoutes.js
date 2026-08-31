const express = require('express');
const router = express.Router();

// Safe mock data so your frontend always has something to display
const mockProblems = [
  { _id: '1', title: 'Two Sum', difficulty: 'Easy', topic: 'Arrays' },
  { _id: '2', title: 'Valid Parentheses', difficulty: 'Easy', topic: 'Stack' },
  { _id: '3', title: 'Merge Intervals', difficulty: 'Medium', topic: 'Arrays' },
  { _id: '4', title: 'LRU Cache', difficulty: 'Medium', topic: 'Design' },
  { _id: '5', title: 'Merge k Sorted Lists', difficulty: 'Hard', topic: 'Linked List' }
];

// This handles the GET request from your frontend
router.get('/', (req, res) => {
  res.json(mockProblems);
});

module.exports = router;