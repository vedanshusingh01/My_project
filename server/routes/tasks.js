
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
  getTasksWithCompletion
} = require('../controllers/tasksController');

router.post('/', auth, createTask);
router.get('/', auth, getTasks);
router.get('/with-completion', auth, getTasksWithCompletion);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);
router.post('/:taskId/toggle', auth, toggleTaskCompletion);

module.exports = router;
