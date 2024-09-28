// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css'; // Import separate CSS file for authentication components

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Use navigate for redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            setMessage('Signup successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/login'); // Redirect to login after signup
            }, 2000);
        } else {
            setMessage(data.error || 'Signup failed.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
            {message && <p>{message}</p>}
            <p>Already have an account? <a href="/login">Log In</a></p> {/* Link to login */}
        </div>
    );
};

export default Signup;
