
const Bmi = require('../models/Bmi');

exports.createBmi = async (req, res) => {
  try {
    const { height, weight } = req.body;
    const bmi = (weight / (height * height)).toFixed(2);
    
    const newBmi = new Bmi({
      user: req.user._id,
      height,
      weight,
      bmi: parseFloat(bmi)
    });
    
    await newBmi.save();
    res.status(201).json(newBmi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBmiHistory = async (req, res) => {
  try {
    const bmiRecords = await Bmi.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(bmiRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
