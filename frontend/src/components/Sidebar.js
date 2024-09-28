// src/components/Sidebar.js
import React from 'react';
import { FaSignOutAlt, FaHeartbeat, FaBrain, FaAppleAlt, FaComments, FaRunning, FaGamepad } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './styles/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    sessionStorage.removeItem('userId'); // Remove user ID from session storage
    navigate('/login'); // Redirect to login
  };

  return (
    <div className="sidebar">
      <div className="logo-section">
        <img src="Health_Sphere_Logo.png" alt="Wellness Sphere" className="logo" onClick={() => navigate('/dashboard')} />
        <h2>Wellness Sphere</h2>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li onClick={() => navigate('/dashboard')}>
            <FaHeartbeat className="icon" />
            <span>Personalized Dashboard</span>
          </li>
          <li onClick={() => navigate('/mental-health')}>
            <FaBrain className="icon" />
            <span>Mental Health Tracker</span>
          </li>
          <li onClick={() => navigate('/nutrition')}>
            <FaAppleAlt className="icon" />
            <span>Nutritional Recommendations</span>
          </li>
          <li onClick={() => navigate('/chatbot')}>
            <FaComments className="icon" />
            <span>ChatBot</span>
          </li>
          <li onClick={() => navigate('/activities')}>
            <FaRunning className="icon" />
            <span>Activities</span>
          </li>
          <li onClick={() => navigate('/game')}>
            <FaGamepad className="icon" />
            <span>Game</span>
          </li>
          <li onClick={handleLogout}>
            <FaSignOutAlt className="icon" />
            
            <span>Log out</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
