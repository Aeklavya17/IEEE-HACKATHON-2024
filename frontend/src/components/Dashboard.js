import React from 'react';
import './styles/Dashboard.css';
import HealthChart from './HealthChart';

const Dashboard = ({ user }) => {
  return (
    <div className="dashboard">
      
      
      <div className="stats-section">
        <div className="card">
          <h4>Height: 175 cm</h4>
          <h4>Weight: 65 kg</h4>
          <h4>BMI: 24.4</h4>
        </div>
        <div className="card">
          <h4>Blood Pressure</h4>
          <p>Systolic: 120 mmHg</p>
          <p>Diastolic: 80 mmHg</p>
        </div>
      </div>

      <div className="chart-section">
        <HealthChart />
      </div>
    </div>
  );
};

export default Dashboard;
