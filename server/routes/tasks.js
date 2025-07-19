
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const TaskCompletion = require('../models/TaskCompletion');
const auth = require('../middleware/auth');

// Get all tasks for user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, frequency } = req.body;
    
    const task = new Task({
      user: req.user._id,
      title,
      description,
      frequency
    });
    
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Toggle task completion for today
router.post('/:taskId/toggle', auth, async (req, res) => {
  try {
    const { taskId } = req.params;
    const today = new Date().toISOString().split('T')[0];
    
    const existing = await TaskCompletion.findOne({
      task: taskId,
      user: req.user._id,
      date: today
    });
    
    if (existing) {
      await TaskCompletion.deleteOne({ _id: existing._id });
      res.json({ isCompleted: false });
    } else {
      const completion = new TaskCompletion({
        task: taskId,
        user: req.user._id,
        date: today
      });
      await completion.save();
      res.json({ isCompleted: true });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get today's task completions
router.get('/completions', auth, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const completions = await TaskCompletion.find({
      user: req.user._id,
      date: today
    });
    
    res.json(completions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
