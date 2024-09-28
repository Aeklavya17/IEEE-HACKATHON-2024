// src/components/StepsTracker.js
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const StepsTracker = ({ steps, goal }) => {
  const percentage = (steps / goal) * 100;

  return (
    <div className="steps-tracker">
      <h2>Steps</h2>
      <CircularProgressbar
        value={percentage}
        text={`${steps}/${goal}`}
        styles={buildStyles({
          textColor: "#f00",
          pathColor: "#ff0000",
          trailColor: "#d6d6d6",
        })}
      />
    </div>
  );
};

export default StepsTracker;
