
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getBmiHistory, getMetrics, getTasks } from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [bmiData, setBmiData] = useState([]);
  const [metricsData, setMetricsData] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bmi, metrics, userTasks] = await Promise.all([
          getBmiHistory(),
          getMetrics(),
          getTasks()
        ]);
        setBmiData(bmi);
        setMetricsData(metrics);
        setTasks(userTasks);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Welcome to your Health Dashboard</h1>
      <div className="dashboard-grid">
        <div className="card">
          <h3>Latest BMI</h3>
          {bmiData[0] && <p>{bmiData[0].bmi}</p>}
        </div>
        <div className="card">
          <h3>Today's Tasks</h3>
          {tasks.map(task => (
            <div key={task._id}>{task.title}</div>
          ))}
        </div>
        <div className="card">
          <h3>Recent Metrics</h3>
          {metricsData.slice(0, 3).map(metric => (
            <div key={metric._id}>
              Weight: {metric.weight}kg, Sleep: {metric.sleepHours}h
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
