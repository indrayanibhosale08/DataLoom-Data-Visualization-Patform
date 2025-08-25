// server/routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { generateInsights } = require('../controllers/aiController');

// @route    POST api/ai/generate-insights
// @desc     Generate AI-powered insights from data
// @access   Private
router.post('/generate-insights', auth, generateInsights);

module.exports = router;
