import React from 'react';
import distanceIcon from '../components/road.png'; // Import your distance logo

const DistanceTracker = ({ distance, maxDistance }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress = (distance / maxDistance) * circumference;

  return (
    <div className="distance-container tracker">
      <h2>Distance Travelled</h2>
      <div className="distance-progress">
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
              stroke: '#FFEB3B',
            }}
          />
        </svg>
        <img src={distanceIcon} alt="Distance Logo" className="logo-center" />
        <div className="distance-info">{distance.toFixed(2)} / {maxDistance} km</div>
      </div>
      <p>{distance.toFixed(2)} km</p>
    </div>
  );
};

export default DistanceTracker;
