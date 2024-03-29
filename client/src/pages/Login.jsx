import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css'; 
import loginImage from '../assets/login-image.jpg';

function Login() {
  const URL = 'http://localhost:5173/';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('patient');
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      const response = await fetch(URL + 'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: username,
          password: password,
          role: userType
        })
      });

      if (response.ok) {
        console.log("you are here...2");
        // const data = await response.json();
        // const token = data.token;
        // document.cookie = `token=${token}; path=/`; 
        // console.log('Login successful. Token:', token);
        // navigate('/');
        const data = await response.json();
        const token = data.token;
        document.cookie = `token=${token}; path=/`; 
        console.log('Login successful. Token:', token);
        
        // Redirect based on user role
        if (userType === 'patient') {
          console.log("you are here...3");
          navigate('/patients'); // Redirect to patient route
        } else if (userType === 'doctor') {
          navigate('/doctors'); // Redirect to doctor route
        } else if (userType === 'staff') {
          navigate('/staff'); // Redirect to staff route
        }
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
