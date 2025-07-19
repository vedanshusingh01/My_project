
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProgressChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="no-data">No data available for chart</div>;
  }

  // Format data for the chart
  const chartData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    weight: item.weight,
    sleep: item.sleepHours,
    water: item.waterIntake,
    steps: item.steps ? item.steps / 1000 : null // Convert to thousands for better scaling
  }));

  return (
    <div className="progress-chart">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => [
              name === 'steps' ? `${(value * 1000).toLocaleString()} steps` : value,
              name === 'weight' ? 'Weight (kg)' :
              name === 'sleep' ? 'Sleep (hours)' :
              name === 'water' ? 'Water (L)' :
              name === 'steps' ? 'Steps (K)' : name
            ]}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="weight" 
            stroke="#8884d8" 
            strokeWidth={2}
            name="weight"
          />
          <Line 
            type="monotone" 
            dataKey="sleep" 
            stroke="#82ca9d" 
            strokeWidth={2}
            name="sleep"
          />
          <Line 
            type="monotone" 
            dataKey="water" 
            stroke="#ffc658" 
            strokeWidth={2}
            name="water"
          />
          <Line 
            type="monotone" 
            dataKey="steps" 
            stroke="#ff7300" 
            strokeWidth={2}
            name="steps"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
