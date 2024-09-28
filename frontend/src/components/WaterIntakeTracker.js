// src/components/WaterIntakeTracker.js
import React, { useState } from 'react';


const WaterIntakeTracker = () => {
  const [glasses, setGlasses] = useState(0);
  const goalInLiters = 3.6;
  const glassVolume = 0.2; // Each glass is 200ml or 0.2 liters
  const totalGlassesNeeded = goalInLiters / glassVolume;

  const addGlass = () => {
    setGlasses(prev => (prev < totalGlassesNeeded ? prev + 1 : prev));
  };

  const removeGlass = () => {
    setGlasses(prev => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div className="water-tracker">
      <h2>Water Intake</h2>
      <p>{glasses * glassVolume} / {goalInLiters} Liters</p>
      <div className="buttons">
        <button onClick={removeGlass}>-</button>
        <button onClick={addGlass}>+</button>
      </div>
    </div>
  );
};

export default WaterIntakeTracker;
