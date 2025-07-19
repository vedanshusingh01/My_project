const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);

const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  // ... (try/catch block)
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  await user.save();
  res.status(201).send({ message: 'User registered successfully!' });
};

exports.login = async (req, res) => {
  // ... (try/catch block)
  const user = await User.findOne({ email: req.body.email });
  if (!user || !await bcrypt.compare(req.body.password, user.password)) {
    return res.status(401).send({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.status(200).send({ token });
};

import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  // Login, logout functions that modify state and localStorage
  // ...
  return (
    <AuthContext.Provider value={{ token /* ... other values */ }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// In Register.js
import { registerUser } from '../services/api';

const handleRegister = async (e) => {
  e.preventDefault();
  // Call API service with form data
  await registerUser({ username, email, password });
  // Redirect to login
};

const mongoose = require('mongoose');

const bmiSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bmi: { type: Number, required: true },
  height: { type: Number, required: true }, // in meters
  weight: { type: Number, required: true }, // in kg
}, { timestamps: true });

module.exports = mongoose.model('Bmi', bmiSchema);

// POST /api/bmi - Save new BMI record
// GET /api/bmi - Get all BMI records for the logged-in user

const [height, setHeight] = useState(''); // in cm
const [weight, setWeight] = useState(''); // in kg
const [bmi, setBmi] = useState(null);

const calculateBmi = () => {
  if (height > 0 && weight > 0) {
    const heightInMeters = height / 100;
    const calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(calculatedBmi);
    // Call API service to save the record
    saveBmiRecord({ height: heightInMeters, weight, bmi: calculatedBmi });
  }
};

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

// POST /api/metrics - Create/Update today's metrics
// GET /api/metrics?range=7 - Get metrics for the last 7 days

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ProgressChart = ({ data /* fetched from /api/metrics */ }) => (
  <LineChart width={500} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="weight" stroke="#8884d8" />
    <Line type="monotone" dataKey="sleepHours" stroke="#82ca9d" />
  </LineChart>
);

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  frequency: { type: String, enum: ['daily', 'weekly'], default: 'daily' },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);

const mongoose = require('mongoose');

const taskCompletionSchema = new mongoose.Schema({
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  isCompleted: { type: Boolean, default: true },
});

module.exports = mongoose.model('TaskCompletion', taskCompletionSchema);