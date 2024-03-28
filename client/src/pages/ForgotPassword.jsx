import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons for password visibility
import './ForgotPassword.css'; 

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resetSuccessful, setResetSuccessful] = useState(false); // State to track password reset success
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleGetCode = () => {
    // Implement code to send code to user's email
    console.log('Get Code clicked');
    // For demo purposes, assume email is verified
    setIsEmailVerified(true);
  };

  const handleVerify = () => {
    // Implement verification mechanism
    console.log('Verify clicked');
    setIsVerifying(true); // Show loading animation
    // For demo purposes, assume verification is successful
    setTimeout(() => {
      setIsEmailVerified(true);
      setIsVerifying(false); // Hide loading animation
      alert('Verification successful!'); // Show message box
    }, 2000); // Simulate API call delay
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Validate password complexity
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z])(?!.*\s).{8,16}$/;
    if (!passwordRegex.test(newPassword)) {
      alert('Password must be 8-16 characters long, contain at least one number, one special character, and no spaces');
      return;
    }

    // Verification successful
    setResetSuccessful(true);
  };

  const handleCodeChange = (e) => {
    let value = e.target.value;
    // Allow only integers for code input
    value = value.replace(/\D/, '');
    // Limit to 4 digits
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    setCode(value);
  };

  const handleNewPasswordChange = (e) => {
    let value = e.target.value;
    // Remove spaces from password
    value = value.replace(/\s/g, '');
    setNewPassword(value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div id='Anubhavmainpagesquarebox'>
      <div id='Anubhavmaintextcontentinsidesquarebox'>
        {resetSuccessful ? (
          <div>
            <h2>Password Reset Successful!</h2>
            <p>Your password has been successfully reset.</p>
            <p>Click <Link to="/login">here</Link> to go to the login page.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div><h2>Forgot Password</h2></div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="button" onClick={handleGetCode} disabled={!email}>Get Code</button>
            </div>
            <br />
            <div>
              <label htmlFor="code">4-Digit Code:</label>
              <input
                type="number"
                id="code"
                value={code}
                onChange={handleCodeChange}
                maxLength={4} // Limit input length to 4 characters
                disabled={!isEmailVerified || isVerifying}
              />
              <button type="button" onClick={handleVerify} disabled={!email || isVerifying}>{isVerifying ? 'Verifying...' : 'Verify'}</button>
            </div>
            <br />
            <div>
              <label htmlFor="newPassword">New Password:</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="newPassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
                maxLength={16} // Limit input length to 16 characters
                disabled={!isEmailVerified || isVerifying || !code}
              />
              <button type="button" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              <br />
              <small>Password must be 8-16 characters, </small>
              <br />
              <small>contain at least one number and one special character</small>
            </div>
            <br />
            <div>
              <label htmlFor="confirmPassword">Confirm New Password:</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={!isEmailVerified || isVerifying || !code}
              />
              <button type="button" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <br />
            <br />
            <button  id='buttonsubmit' type ="submit" disabled={!isEmailVerified || isVerifying || !code}>Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
