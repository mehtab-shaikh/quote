import React, { useState } from 'react';
import { loginUser } from '../api/api';
import { setToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import '../App.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const { token } = await loginUser(username, otp);
            setToken(token);
            navigate('/quotes');
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <input
                placeholder="OTP"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
