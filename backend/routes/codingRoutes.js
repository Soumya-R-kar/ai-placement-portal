const express = require('express');
const { getAllProblems, getProblemById, executeCode } = require('../controllers/codingController');
const router = express.Router();
router.get('/problems', getAllProblems);
router.get('/problems/:id', getProblemById);
router.post('/execute', executeCode);
module.exports = router;
