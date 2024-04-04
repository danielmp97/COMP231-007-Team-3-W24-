import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css'; 
import loginImage from '../assets/login-image.jpg';

function Login() {
  const URL = 'http://localhost:8000/';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const navigate = useNavigate(); 



  const handleLogin = async () => {
    try {
      const response = await fetch(URL + 'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'user@example.com',
          password: 'pass',
          role: 'doctor'
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        const token = data.token;
        console.log(token)
        document.cookie = `token=${token}; path=/`; 
        console.log('Login successful. Token:', token);
        navigate('/');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="image-container">
          <img src={loginImage} alt="medical-instrument" />
        </div>
        <div className="login-container">
          <h2>Login</h2>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="userType">User Type:</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="">Select User Type</option>
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
              <option value="IT staff">Staff</option>
              <option value="front desk">Front Desk</option>
            </select>
          </div>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
