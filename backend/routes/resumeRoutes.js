const express = require('express');
const multer = require('multer');
const { analyzeResume } = require('../controllers/resumeController');
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
router.post('/analyze', upload.single('resume'), analyzeResume);
module.exports = router;
