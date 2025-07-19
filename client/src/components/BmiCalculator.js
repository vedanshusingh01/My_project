
import React, { useState } from 'react';
import { saveBmiRecord } from '../services/api';

const BmiCalculator = ({ onUpdate }) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const calculateBmi = () => {
    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      const calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(calculatedBmi);
      
      // Determine BMI category
      let bmiCategory = '';
      if (calculatedBmi < 18.5) bmiCategory = 'Underweight';
      else if (calculatedBmi < 25) bmiCategory = 'Normal weight';
      else if (calculatedBmi < 30) bmiCategory = 'Overweight';
      else bmiCategory = 'Obese';
      
      setCategory(bmiCategory);
    }
  };

  const saveBmi = async () => {
    if (!bmi) return;
    
    setLoading(true);
    try {
      await saveBmiRecord({
        height: height / 100,
        weight: parseFloat(weight),
        bmi: parseFloat(bmi)
      });
      
      if (onUpdate) onUpdate();
      alert('BMI record saved successfully!');
    } catch (error) {
      alert('Error saving BMI record: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bmi-calculator">
      <div className="form-row">
        <div className="form-group">
          <label>Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="170"
          />
        </div>
        <div className="form-group">
          <label>Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
          />
        </div>
      </div>
      
      <button onClick={calculateBmi} className="calculate-btn">
        Calculate BMI
      </button>
      
      {bmi && (
        <div className="bmi-result">
          <div className="bmi-value">
            <h3>Your BMI: {bmi}</h3>
            <p className={`bmi-category ${category.toLowerCase().replace(' ', '-')}`}>
              {category}
            </p>
          </div>
          <button 
            onClick={saveBmi} 
            className="save-btn"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Record'}
          </button>
        </div>
      )}
    </div>
  );
};

export default BmiCalculator;
