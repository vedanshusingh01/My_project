
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// Auth API
export const registerUser = async (userData) => {
  return apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const loginUser = async (credentials) => {
  return apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

// BMI API
export const saveBmiRecord = async (bmiData) => {
  return apiCall('/bmi', {
    method: 'POST',
    body: JSON.stringify(bmiData),
  });
};

export const getBmiHistory = async () => {
  return apiCall('/bmi');
};

export const getLatestBmi = async () => {
  return apiCall('/bmi/latest');
};

// Metrics API
export const saveMetrics = async (metricsData) => {
  return apiCall('/metrics', {
    method: 'POST',
    body: JSON.stringify(metricsData),
  });
};

export const getMetrics = async (range = 7) => {
  return apiCall(`/metrics?range=${range}`);
};

export const getTodayMetrics = async () => {
  return apiCall('/metrics/today');
};

// Tasks API
export const createTask = async (taskData) => {
  return apiCall('/tasks', {
    method: 'POST',
    body: JSON.stringify(taskData),
  });
};

export const getTasks = async () => {
  return apiCall('/tasks');
};

export const getTasksWithCompletion = async (date) => {
  const dateParam = date ? `?date=${date}` : '';
  return apiCall(`/tasks/with-completion${dateParam}`);
};

export const updateTask = async (taskId, taskData) => {
  return apiCall(`/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(taskData),
  });
};

export const deleteTask = async (taskId) => {
  return apiCall(`/tasks/${taskId}`, {
    method: 'DELETE',
  });
};

export const toggleTaskCompletion = async (taskId, date) => {
  return apiCall(`/tasks/${taskId}/toggle`, {
    method: 'POST',
    body: JSON.stringify({ date }),
  });
};
