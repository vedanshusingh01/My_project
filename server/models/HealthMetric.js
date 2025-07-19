
const mongoose = require('mongoose');

const healthMetricSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  weight: { type: Number },
  sleepHours: { type: Number },
  waterIntake: { type: Number }, // in liters
  steps: { type: Number },
}, { timestamps: true });

// Ensure one record per user per day
healthMetricSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('HealthMetric', healthMetricSchema);
