
const mongoose = require('mongoose');

const taskCompletionSchema = new mongoose.Schema({
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  isCompleted: { type: Boolean, default: true },
});

module.exports = mongoose.model('TaskCompletion', taskCompletionSchema);
