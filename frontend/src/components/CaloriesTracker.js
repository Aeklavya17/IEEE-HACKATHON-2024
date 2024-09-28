import React from 'react';
import caloriesIcon from '../components/calories.png'; // Import your calories logo

const CaloriesTracker = ({ calories, maxCalories }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress = (calories / maxCalories) * circumference;

  return (
    <div className="calories-container tracker">
      <h2>Calories Burned</h2>
      <div className="calories-progress">
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
              stroke: '#FF5722',
            }}
          />
        </svg>
        <img src={caloriesIcon} alt="Calories Logo" className="logo-center" />
        <div className="calories-info">{calories} / {maxCalories} kcal</div>
      </div>
      <p>{calories} kcal</p>
    </div>
  );
};

export default CaloriesTracker;
