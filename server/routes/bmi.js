
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { saveBmi, getBmiHistory, getLatestBmi } = require('../controllers/bmiController');

router.post('/', auth, saveBmi);
router.get('/', auth, getBmiHistory);
router.get('/latest', auth, getLatestBmi);

module.exports = router;
