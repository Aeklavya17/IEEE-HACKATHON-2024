import React, { useState, useEffect } from 'react';
import StepsTracker from '../components/StepsTracker.js';
import HeartRateTracker from '../components/HeartRateTracker.js';
import DistanceTracker from '../components/DistanceTracker.js';
import CaloriesTracker from '../components/CaloriesTracker.js';
import '../components/styles/Activities.css';

function App() {
  const [steps, setSteps] = useState(2000);
  const [heartRate, setHeartRate] = useState(85); // Default heart rate within the running range
  const [distance, setDistance] = useState(2.0); // in kilometers
  const [calories, setCalories] = useState(175); // in kcal
  const [isRunning, setIsRunning] = useState(true); // To track whether the simulation is running or paused

  // Goals for the progress bars
  const stepGoal = 10000;
  const maxHeartRateRunning = 130; // Maximum heart rate target when running
  const minHeartRateRunning = 120; // Minimum heart rate target when running
  const maxHeartRatePaused = 90; // Maximum heart rate target when paused
  const minHeartRatePaused = 80; // Minimum heart rate target when paused
  const maxDistance = 10; // Maximum distance target in km
  const maxCalories = 2000; // Maximum calorie target

  // Function to toggle start/stop state
  const toggleSimulation = () => {
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        // Simulate real-time updates for steps, distance, and calories when running
        setSteps((prevSteps) => (prevSteps < stepGoal ? prevSteps + Math.floor(Math.random() * 20) : prevSteps));
        setDistance((prevDistance) => (prevDistance < maxDistance ? prevDistance + 0.01 : prevDistance)); // Simulate distance increment
        setCalories((prevCalories) => (prevCalories < maxCalories ? prevCalories + Math.floor(Math.random() * 5) : prevCalories)); // Simulate calorie burn
      }

      // Simulate heart rate fluctuation based on whether simulation is running or paused
      setHeartRate((prevRate) => {
        const change = Math.floor(Math.random() * 7) - 4; // Random change between -3 and +3
        if (isRunning) {
          const newRate = prevRate + change;
          return newRate > maxHeartRateRunning ? maxHeartRateRunning : newRate < minHeartRateRunning ? minHeartRateRunning : newRate;
        } else {
          const newRate = prevRate + change;
          return newRate > maxHeartRatePaused ? maxHeartRatePaused : newRate < minHeartRatePaused ? minHeartRatePaused : newRate;
        }
      });
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [isRunning, stepGoal, maxHeartRateRunning, maxDistance, maxCalories, minHeartRateRunning, maxHeartRatePaused, minHeartRatePaused]);

  return (
    <div className="App">
      <h1 className="page-title">Activities</h1>
      <div className="trackers">
        <StepsTracker steps={steps} goal={stepGoal} />
        <HeartRateTracker heartRate={heartRate} maxHeartRate={isRunning ? maxHeartRateRunning : maxHeartRatePaused} />
        <DistanceTracker distance={distance} maxDistance={maxDistance} />
        <CaloriesTracker calories={calories} maxCalories={maxCalories} />
      </div>
      <div className="buttons">
        <button className="toggle-btn" onClick={toggleSimulation}>
          {isRunning ? 'Stop Running' : 'Start Running'}
        </button>
      </div>
    </div>
  );
}

export default App;
