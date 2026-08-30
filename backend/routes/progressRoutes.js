const express = require('express');
const { updateStreak, addCodingProgress, addAptitudeProgress } = require('../controllers/progressController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/streak', protect, updateStreak);
router.post('/coding', protect, addCodingProgress);
router.post('/aptitude', protect, addAptitudeProgress);

module.exports = router;