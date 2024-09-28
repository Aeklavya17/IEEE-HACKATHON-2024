import React, { useState, useRef } from 'react';
import '../components/styles/Game.css';

const BUBBLE_COUNT = 30;

const BubblePop = () => {
  const [bubbles, setBubbles] = useState(Array(BUBBLE_COUNT).fill(true));
  const [score, setScore] = useState(0);
  const popSound = useRef(new Audio('/bubble.mp3')); // Ref to store audio file

  const popBubble = (index) => {
    if (bubbles[index]) {
      popSound.current.play(); // Play sound when a bubble is popped
      setBubbles(prevBubbles => {
        const newBubbles = [...prevBubbles];
        newBubbles[index] = false; // Mark bubble as popped
        return newBubbles;
      });
      setScore(score + 1); // Increment score
    }
  };

  return (
    <div className="bubble-game">
      <h2>Bubble Wrap Game</h2>
      <h3>Stress Reliever</h3>
      <h3>Score: {score}</h3>
      <div className="bubble-wrap">
        {bubbles.map((isActive, index) => (
          <div
            key={index}
            className={`bubble ${isActive ? 'active' : 'popped'}`}
            onClick={() => popBubble(index)}
          />
        ))}
      </div>
      {score === BUBBLE_COUNT && <h3>All bubbles popped!</h3>}
    </div>
  );
};

const App = () => {
  return (
    <div className="app7">
      
      <BubblePop />
    </div>
  );
};

export default App;
