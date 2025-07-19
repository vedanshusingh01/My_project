
const HealthMetric = require('../models/HealthMetric');

exports.saveMetrics = async (req, res) => {
  try {
    const { date, weight, sleepHours, waterIntake, steps } = req.body;
    const metricDate = new Date(date || new Date().toISOString().split('T')[0]);
    
    const metrics = await HealthMetric.findOneAndUpdate(
      { user: req.user, date: metricDate },
      { weight, sleepHours, waterIntake, steps },
      { upsert: true, new: true }
    );
    
    res.json({ message: 'Metrics saved successfully', metrics });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMetrics = async (req, res) => {
  try {
    const { range = 7 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(range));
    
    const metrics = await HealthMetric.find({
      user: req.user,
      date: { $gte: startDate }
    }).sort({ date: 1 });
    
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getTodayMetrics = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const metrics = await HealthMetric.findOne({
      user: req.user,
      date: new Date(today)
    });
    
    res.json(metrics || {});
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
