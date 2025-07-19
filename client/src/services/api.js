
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// BMI services
export const saveBmiRecord = async (bmiData) => {
  const response = await api.post('/bmi', bmiData);
  return response.data;
};

export const getBmiRecords = async () => {
  const response = await api.get('/bmi');
  return response.data;
};

// Health metrics services
export const saveHealthMetrics = async (metricsData) => {
  const response = await api.post('/metrics', metricsData);
  return response.data;
};

export const getHealthMetrics = async (range = 7) => {
  const response = await api.get(`/metrics?range=${range}`);
  return response.data;
};

// Task services
export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

export const updateTask = async (taskId, taskData) => {
  const response = await api.put(`/tasks/${taskId}`, taskData);
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};

export const markTaskComplete = async (taskId, date) => {
  const response = await api.post(`/tasks/${taskId}/complete`, { date });
  return response.data;
};

export const getDailyTasks = async (date) => {
  const response = await api.get(`/tasks/daily?date=${date}`);
  return response.data;
};

export default api;
