
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import BmiCalculator from '../components/BmiCalculator';
import MetricsForm from '../components/MetricsForm';
import TaskManager from '../components/TaskManager';
import ProgressChart from '../components/ProgressChart';
import { getLatestBmi, getMetrics, getTodayMetrics } from '../services/api';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [latestBmi, setLatestBmi] = useState(null);
  const [metricsData, setMetricsData] = useState([]);
  const [todayMetrics, setTodayMetrics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [bmiData, weeklyMetrics, todayData] = await Promise.all([
        getLatestBmi(),
        getMetrics(7),
        getTodayMetrics()
      ]);
      
      setLatestBmi(bmiData);
      setMetricsData(weeklyMetrics);
      setTodayMetrics(todayData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMetricsUpdate = () => {
    loadDashboardData();
  };

  const handleBmiUpdate = () => {
    loadDashboardData();
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user?.username}!</h1>
        <button onClick={logout} className="logout-btn">Logout</button>
      </header>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>BMI Calculator</h2>
          <BmiCalculator onUpdate={handleBmiUpdate} />
          {latestBmi && (
            <div className="latest-bmi">
              <p>Latest BMI: <strong>{latestBmi.bmi}</strong></p>
              <p>Recorded: {new Date(latestBmi.createdAt).toLocaleDateString()}</p>
            </div>
          )}
        </div>

        <div className="dashboard-card">
          <h2>Today's Metrics</h2>
          <MetricsForm initialData={todayMetrics} onUpdate={handleMetricsUpdate} />
        </div>

        <div className="dashboard-card">
          <h2>Health Tasks</h2>
          <TaskManager />
        </div>

        <div className="dashboard-card chart-card">
          <h2>Weekly Progress</h2>
          <ProgressChart data={metricsData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
