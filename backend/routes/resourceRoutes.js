const express = require('express');
const { getAllResources } = require('../controllers/resourceController');
const router = express.Router();
router.get('/', getAllResources);
module.exports = router;
