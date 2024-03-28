import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
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
          email: username,
          password: password,
          role: userType
        })
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
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

  const handleForgotPassword = () => {
    // Handle forgot password action here
    navigate('/forgotpassword'); // Navigate to the forgot password page
  };
  const handleChangeEmail = () => {
    // Handle change email action here
    navigate('/changeemail'); // Navigate to the change email page
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
          <div><button onClick={handleLogin}>Login</button></div>
          <div><button onClick={handleForgotPassword}>Forgot Password</button></div> 
          <div><div><button onClick={handleChangeEmail}>Change Email</button></div> </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
