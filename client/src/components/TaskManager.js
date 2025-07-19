
import React, { useState, useEffect } from 'react';
import { 
  createTask, 
  getTasksWithCompletion, 
  updateTask, 
  deleteTask, 
  toggleTaskCompletion 
} from '../services/api';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    frequency: 'daily'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const tasksData = await getTasksWithCompletion(today);
      setTasks(tasksData);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingTask) {
        await updateTask(editingTask._id, formData);
      } else {
        await createTask(formData);
      }
      
      setFormData({ title: '', description: '', frequency: 'daily' });
      setShowForm(false);
      setEditingTask(null);
      loadTasks();
    } catch (error) {
      alert('Error saving task: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      frequency: task.frequency
    });
    setShowForm(true);
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        loadTasks();
      } catch (error) {
        alert('Error deleting task: ' + error.message);
      }
    }
  };

  const handleToggleCompletion = async (taskId) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      await toggleTaskCompletion(taskId, today);
      loadTasks();
    } catch (error) {
      alert('Error updating task completion: ' + error.message);
    }
  };

  return (
    <div className="task-manager">
      <div className="task-header">
        <h3>Today's Tasks</h3>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="add-task-btn"
        >
          {showForm ? 'Cancel' : 'Add Task'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            placeholder="Task title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
          <select
            value={formData.frequency}
            onChange={(e) => setFormData({...formData, frequency: e.target.value})}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : (editingTask ? 'Update Task' : 'Add Task')}
          </button>
        </form>
      )}

      <div className="task-list">
        {tasks.map(task => (
          <div key={task._id} className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
            <div className="task-content">
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => handleToggleCompletion(task._id)}
              />
              <div className="task-details">
                <h4>{task.title}</h4>
                {task.description && <p>{task.description}</p>}
                <span className="frequency">{task.frequency}</span>
              </div>
            </div>
            <div className="task-actions">
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <p className="no-tasks">No tasks yet. Add your first health goal!</p>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
