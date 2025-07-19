
const express = require('express');
const router = express.Router();
const Bmi = require('../models/Bmi');
const auth = require('../middleware/auth');

// Save BMI record
router.post('/', auth, async (req, res) => {
  try {
    const { height, weight, bmi } = req.body;
    
    const bmiRecord = new Bmi({
      user: req.user._id,
      height,
      weight,
      bmi
    });
    
    await bmiRecord.save();
    res.status(201).json(bmiRecord);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get BMI history
router.get('/', auth, async (req, res) => {
  try {
    const bmiRecords = await Bmi.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.json(bmiRecords);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
