import React from 'react';
import heartIcon from '../components/activity-tracker.png'; // Import your heart rate logo

const HeartRateTracker = ({ heartRate, maxHeartRate }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress = (heartRate / maxHeartRate) * circumference;

  return (
    <div className="heart-rate-container tracker">
      <h2>Heart Rate</h2>
      <div className="heart-rate-progress">
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
              stroke: '#F44336',
            }}
          />
        </svg>
        <img src={heartIcon} alt="Heart Logo" className="logo-center" />
        <div className="heart-rate-info">{heartRate} / {maxHeartRate} bpm</div>
      </div>
      <p>{heartRate} bpm</p>
    </div>
  );
};

export default HeartRateTracker;
