
const Task = require('../models/Task');
const TaskCompletion = require('../models/TaskCompletion');

exports.createTask = async (req, res) => {
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
    res.status(400).json({ message: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleTaskCompletion = async (req, res) => {
  try {
    const { taskId } = req.params;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const existing = await TaskCompletion.findOne({
      task: taskId,
      user: req.user._id,
      date: today
    });
    
    if (existing) {
      await TaskCompletion.deleteOne({ _id: existing._id });
      res.json({ completed: false });
    } else {
      await TaskCompletion.create({
        task: taskId,
        user: req.user._id,
        date: today
      });
      res.json({ completed: true });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
