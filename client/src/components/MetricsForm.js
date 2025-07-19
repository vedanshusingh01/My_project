
import React, { useState, useEffect } from 'react';
import { saveMetrics } from '../services/api';

const MetricsForm = ({ initialData = {}, onUpdate }) => {
  const [metrics, setMetrics] = useState({
    weight: '',
    sleepHours: '',
    waterIntake: '',
    steps: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setMetrics({
        weight: initialData.weight || '',
        sleepHours: initialData.sleepHours || '',
        waterIntake: initialData.waterIntake || '',
        steps: initialData.steps || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setMetrics({
      ...metrics,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const today = new Date().toISOString().split('T')[0];
      await saveMetrics({
        date: today,
        weight: metrics.weight ? parseFloat(metrics.weight) : null,
        sleepHours: metrics.sleepHours ? parseFloat(metrics.sleepHours) : null,
        waterIntake: metrics.waterIntake ? parseFloat(metrics.waterIntake) : null,
        steps: metrics.steps ? parseInt(metrics.steps) : null
      });

      if (onUpdate) onUpdate();
      alert('Metrics saved successfully!');
    } catch (error) {
      alert('Error saving metrics: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="metrics-form">
      <div className="form-group">
        <label>Weight (kg)</label>
        <input
          type="number"
          name="weight"
          value={metrics.weight}
          onChange={handleChange}
          step="0.1"
          placeholder="70.5"
        />
      </div>

      <div className="form-group">
        <label>Sleep Hours</label>
        <input
          type="number"
          name="sleepHours"
          value={metrics.sleepHours}
          onChange={handleChange}
          step="0.5"
          placeholder="8"
        />
      </div>

      <div className="form-group">
        <label>Water Intake (liters)</label>
        <input
          type="number"
          name="waterIntake"
          value={metrics.waterIntake}
          onChange={handleChange}
          step="0.1"
          placeholder="2.5"
        />
      </div>

      <div className="form-group">
        <label>Steps</label>
        <input
          type="number"
          name="steps"
          value={metrics.steps}
          onChange={handleChange}
          placeholder="10000"
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Metrics'}
      </button>
    </form>
  );
};

export default MetricsForm;
