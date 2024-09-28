// src/App.js
import React, { useState } from 'react';
import fitnessTypes from '../data/fitnessTypes.js';
import '../components/styles/Nutrition.css';

const App = () => {
  const [selectedType, setSelectedType] = useState(null);

  const handleButtonClick = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="App1">
      <h1>Human Fitness Types</h1>
      <div className="button-container1">
        {Object.keys(fitnessTypes).map((type) => (
          <button key={type} onClick={() => handleButtonClick(type)}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {selectedType && (
        <div className="response-content1">
          <h2>{selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}</h2>
          <strong>Impacts:</strong>
          <ul classname="ul1">
            {fitnessTypes[selectedType].impacts.map((impact, index) => (
              <li classname="li1" key={index}>{impact}</li>
            ))}
          </ul>
          <strong>Avoid:</strong>
          <ul classname="ul1">
            {fitnessTypes[selectedType].avoid.map((item, index) => (
              <li classname="li1" key={index}>{item}</li>
            ))}
          </ul >
          <strong>Diet:</strong>
          <ul classname="ul1">
            {fitnessTypes[selectedType].diet.map((food, index) => (
              <li classname="li1" key={index}>{food}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
