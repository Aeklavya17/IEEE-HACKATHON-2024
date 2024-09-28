import React, { useState } from 'react';

const WaterIntake = () => {
  const [glasses, setGlasses] = useState(0);
  const goal = 18; // 3.6 liters = 18 glasses of 200ml each

  const increaseIntake = () => {
    if (glasses < goal) setGlasses(glasses + 1);
  };

  const decreaseIntake = () => {
    if (glasses > 0) setGlasses(glasses - 1);
  };

  return (
    <div className="water-container">
      <h2>Water Intake Tracker</h2>
      <div className="water-intake-info">
        <p>You've had</p>
        <span className="glasses">{glasses}</span>
        <p>glasses today</p>
      </div>
      <div className="water-buttons">
        <button onClick={decreaseIntake}>-</button>
        <button onClick={increaseIntake}>+</button>
      </div>
    </div>
  );
};

export default WaterIntake;
