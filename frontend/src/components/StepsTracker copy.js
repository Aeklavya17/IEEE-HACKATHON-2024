import React from 'react';
import stepsIcon from '../components/footstep.png'; // Import your steps logo

const StepsTracker = ({ steps, goal }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress = (steps / goal) * circumference;

  return (
    <div className="steps-container tracker">
      <h2>Steps Tracker</h2>
      <div className="steps-progress">
        <svg width="150" height="150" viewBox="0 0 150 150">
          <circle cx="75" cy="75" r={radius} className="bg" />
          <circle
            cx="75"
            cy="75"
            r={radius}
            className="fg"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: circumference - progress,
              stroke: '#4CAF50',
            }}
          />
        </svg>
        <img src={stepsIcon} alt="Steps Logo" className="logo-center" />
        <div className="steps-info">{steps} / {goal}</div>
      </div>
      <p>{steps} steps taken</p>
    </div>
  );
};

export default StepsTracker;
