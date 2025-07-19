
const express = require('express');
const router = express.Router();
const HealthMetric = require('../models/HealthMetric');
const auth = require('../middleware/auth');

// Create or update today's metrics
router.post('/', auth, async (req, res) => {
  try {
    const { weight, sleepHours, waterIntake, steps } = req.body;
    const today = new Date().toISOString().split('T')[0];
    
    const metric = await HealthMetric.findOneAndUpdate(
      { user: req.user._id, date: today },
      { weight, sleepHours, waterIntake, steps },
      { new: true, upsert: true }
    );
    
    res.json(metric);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get metrics for date range
router.get('/', auth, async (req, res) => {
  try {
    const range = parseInt(req.query.range) || 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - range);
    
    const metrics = await HealthMetric.find({
      user: req.user._id,
      date: { $gte: startDate }
    }).sort({ date: 1 });
    
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
