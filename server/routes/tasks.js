const express = require('express');
const router = express.Router();
const { createTask, getTasks, toggleTaskCompletion } = require('../controllers/tasksController');
const auth = require('../middleware/auth');

router.post('/', auth, createTask);
router.get('/', auth, getTasks);
router.post('/:taskId/toggle', auth, toggleTaskCompletion);

module.exports = router;