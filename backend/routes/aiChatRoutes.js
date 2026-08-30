const express = require('express');
const { solveDoubt, generateRoadmap, mockInterview } = require('../controllers/aiChatController');
const router = express.Router();
router.post('/doubt', solveDoubt);
router.post('/roadmap', generateRoadmap);
router.post('/interview', mockInterview);
module.exports = router;
