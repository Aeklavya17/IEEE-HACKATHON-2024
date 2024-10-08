import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // Ensure correct import path
import Dashboard from './components/Dashboard'; // Correct path
import MentalHealthTracker from './components/MentalHealthTracker'; // Correct path
import SocialWellbeing from './components/SocialWellbeing'; // Correct path
import Nutrition from './components/Nutrition'; // Correct path
import MedicalIntegration from './components/MedicalIntegration'; // Correct path
import ChatBot from './components/ChatBot'; // Correct path
import Activities from './components/Activities'; // Correct path
import Game from './components/Game';
import Login from './LoginSignupComp/Login';
import Signup from './LoginSignupComp/Signup';
import './App.css'; // Ensure CSS is properly imported

function App() {
  // Using useLocation to determine the current path
  const location = useLocation();

  return (
    <div className="app">
      {/* Conditionally render Sidebar only if not on login or signup pages */}
      {location.pathname !== '/login' && location.pathname !== '/signup' && <Sidebar />}

      {/* Main content changes based on routing */}
      <div className="content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mental-health" element={<MentalHealthTracker />} />
          <Route path="/social-wellbeing" element={<SocialWellbeing />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/medical-integration" element={<MedicalIntegration />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/game" element={<Game />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Dashboard />} /> {/* Default route */}
        </Routes>
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
