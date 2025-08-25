// server/routes/historyRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getHistory, getHistoryStats, getRecentHistory, incrementChartsCreated  } = require('../controllers/historyController');

// Handles requests to /api/history/
router.get('/', auth, getHistory);

// Handles requests to /api/history/stats
router.get('/stats', auth, getHistoryStats); // <-- THIS LINE IS CRITICAL

router.get('/recent', auth, getRecentHistory);

router.post('/increment-charts/:id', auth, incrementChartsCreated);

module.exports = router;