// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css'; // Import separate CSS file for authentication components

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Use navigate for redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token); // Store token in local storage
            sessionStorage.setItem('userId', data.userId); // Store user ID in session storage
            setMessage('Login successful!');
            navigate('/dashboard'); // Redirect to dashboard after successful login
        } else {
            setMessage(data.error || 'Login failed.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
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
                <button type="submit">Log In</button>
            </form>
            {message && <p>{message}</p>}
            <p>Don't have an account? <a href="/signup">Sign Up</a></p> {/* Link to signup */}
        </div>
    );
};

export default Login;
    