
const Bmi = require('../models/Bmi');

exports.saveBmi = async (req, res) => {
  try {
    const { height, weight, bmi } = req.body;
    
    const bmiRecord = new Bmi({
      user: req.user,
      height,
      weight,
      bmi
    });
    
    await bmiRecord.save();
    res.status(201).json({ message: 'BMI record saved successfully', bmiRecord });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getBmiHistory = async (req, res) => {
  try {
    const bmiRecords = await Bmi.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(bmiRecords);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getLatestBmi = async (req, res) => {
  try {
    const latestBmi = await Bmi.findOne({ user: req.user }).sort({ createdAt: -1 });
    res.json(latestBmi);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
