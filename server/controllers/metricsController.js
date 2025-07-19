
const HealthMetric = require('../models/HealthMetric');

exports.saveMetrics = async (req, res) => {
  try {
    const { weight, sleepHours, waterIntake, steps } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const metrics = await HealthMetric.findOneAndUpdate(
      { user: req.user._id, date: today },
      { weight, sleepHours, waterIntake, steps },
      { new: true, upsert: true }
    );
    
    res.json(metrics);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMetrics = async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const metrics = await HealthMetric.find({
      user: req.user._id,
      date: { $gte: startDate }
    }).sort({ date: 1 });
    
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
