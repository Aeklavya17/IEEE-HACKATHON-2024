import React, { useState } from 'react';
import './styles/MentalHealthTracker.css';

const MentalHealthTracker = () => {
  const [mood, setMood] = useState('');
  const [stress, setStress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit mood and stress data (API integration here)
    console.log(`Mood: ${mood}, Stress Level: ${stress}`);
  };

  return (
    <div className="mental-health-tracker">
      <h3>Mental Health Tracker</h3>
      <form onSubmit={handleSubmit}>
        <label>Mood:</label>
        <input type="text" value={mood} onChange={(e) => setMood(e.target.value)} />

        <label>Stress Level:</label>
        <input type="text" value={stress} onChange={(e) => setStress(e.target.value)} />

        <button type="submit">Track</button>
      </form>
    </div>
  );
};

export default MentalHealthTracker;
