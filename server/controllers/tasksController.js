
const Task = require('../models/Task');
const TaskCompletion = require('../models/TaskCompletion');

exports.createTask = async (req, res) => {
  try {
    const { title, description, frequency } = req.body;
    
    const task = new Task({
      user: req.user,
      title,
      description,
      frequency
    });
    
    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, frequency } = req.body;
    
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { title, description, frequency },
      { new: true }
    );
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    // Also delete all completions for this task
    await TaskCompletion.deleteMany({ task: req.params.id });
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.toggleTaskCompletion = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { date } = req.body;
    const completionDate = new Date(date || new Date().toISOString().split('T')[0]);
    
    const existingCompletion = await TaskCompletion.findOne({
      task: taskId,
      user: req.user,
      date: completionDate
    });
    
    if (existingCompletion) {
      await TaskCompletion.deleteOne({ _id: existingCompletion._id });
      res.json({ message: 'Task marked as incomplete', isCompleted: false });
    } else {
      const completion = new TaskCompletion({
        task: taskId,
        user: req.user,
        date: completionDate,
        isCompleted: true
      });
      await completion.save();
      res.json({ message: 'Task marked as complete', isCompleted: true });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getTasksWithCompletion = async (req, res) => {
  try {
    const { date } = req.query;
    const targetDate = new Date(date || new Date().toISOString().split('T')[0]);
    
    const tasks = await Task.find({ user: req.user });
    const completions = await TaskCompletion.find({
      user: req.user,
      date: targetDate
    });
    
    const tasksWithCompletion = tasks.map(task => ({
      ...task.toObject(),
      isCompleted: completions.some(completion => 
        completion.task.toString() === task._id.toString()
      )
    }));
    
    res.json(tasksWithCompletion);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
