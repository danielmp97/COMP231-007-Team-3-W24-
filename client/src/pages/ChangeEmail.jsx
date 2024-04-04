import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import bcrypt from 'bcryptjs';
import './ChangeEmail.css'; 

function ChangeEmail() {
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const URL = 'http://localhost:8000/';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    try {
      const token = getToken();
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      const role = decodedToken.role;

      const response = await fetchUserData(role, userId);
      if (!response) {
        alert('User data not found');
        return;
      }

      const userPassword = response.password;

      // Check old password
      const isOldPasswordValid = await bcrypt.compare(password, userPassword);
      if (!isOldPasswordValid) {
        alert('Invalid old password');
        return;
      }

      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // Update the password
      let updateUrl;
      switch (role) {
        case 'doctor':
          updateUrl = `${URL}doctors/${userId}`;
          break;
        case 'patient':
          updateUrl = `${URL}patients/${userId}`;
          break;
        case 'IT staff':
        case 'front desk':
          updateUrl = `${URL}staff/${userId}`;
          break;
        default:
          alert('Invalid user role');
          return;
      }

      const updateResponse = await fetch(updateUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: hashedNewPassword,
        }),
      });

      if (updateResponse.ok) {
        alert('Password change successful!');
        // Reset form fields
        setOldEmail('');
        setNewEmail('');
        setPassword('');
        setNewPassword('');
        setConfirmPassword('');
        //log out
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/login';
      } else {
        alert('Password change failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred.');
    }
  };

  const getToken = () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
    return token;
  };

  const fetchUserData = async (role, userId) => {
    try {
      let response;
      if (role === 'doctor' || role === 'patient') {
        response = await fetch(`${URL}${role}s/${userId}`);
      } else if (role === 'IT staff' || role === 'front desk') {
        response = await fetch(`${URL}staff/${userId}`);
      }
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    return null;
  };

  return (
    <div className='change-email-container'>
      <div id='ChangeEmailContent'>
        <form onSubmit={handleSubmit}>
          <div><h2>Change Email</h2></div>
          <div>
            <label htmlFor="oldEmail">Old Email:</label>
            <input
              type="email"
              id="oldEmail"
              value={oldEmail}
              onChange={(e) => setOldEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="newEmail">New Email:</label>
            <input
              type="email"
              id="newEmail"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <br />
          <div>
            <button type="submit" id='change-email-button'>Change Email</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangeEmail;
