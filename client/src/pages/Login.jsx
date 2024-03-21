import React, { useState } from 'react';
import './Login.css'; 
import loginImage from '../assets/login-image.jpg';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('doctor');

  const handleLogin = () => {
    console.log(`Logging in as ${userType} with username: ${username} and password: ${password}`);
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
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
