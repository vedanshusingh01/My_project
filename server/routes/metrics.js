const express = require('express');
const router = express.Router();
const { saveMetrics, getMetrics } = require('../controllers/metricsController');
const auth = require('../middleware/auth');

router.post('/', auth, saveMetrics);
router.get('/', auth, getMetrics);

module.exports = router;