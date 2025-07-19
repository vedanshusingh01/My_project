const express = require('express');
const router = express.Router();
const { createBmi, getBmiHistory } = require('../controllers/bmiController');
const auth = require('../middleware/auth');

router.post('/', auth, createBmi);
router.get('/', auth, getBmiHistory);

module.exports = router;