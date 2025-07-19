
const mongoose = require('mongoose');

const bmiSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bmi: { type: Number, required: true },
  height: { type: Number, required: true }, // in meters
  weight: { type: Number, required: true }, // in kg
}, { timestamps: true });

module.exports = mongoose.model('Bmi', bmiSchema);
