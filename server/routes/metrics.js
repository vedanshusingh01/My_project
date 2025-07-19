
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { saveMetrics, getMetrics, getTodayMetrics } = require('../controllers/metricsController');

router.post('/', auth, saveMetrics);
router.get('/', auth, getMetrics);
router.get('/today', auth, getTodayMetrics);

module.exports = router;
