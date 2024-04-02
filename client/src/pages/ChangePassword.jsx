import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import { jwtDecode } from "jwt-decode";
import './ChangePassword.css'; 

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const URL = 'http://localhost:8000/';

  const getToken = () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
    return token;
    };

    const token = getToken();
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    const role = decodedToken.role;

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (newPassword !== confirmPassword) {
          alert('New password and confirm password do not match');
          return;
        }
      
        try {
          const response = await fetchUserData(role, userId);
          if (!response) {
            alert('User data not found');
            return;
          }
      
          const userPassword = response.password;
      
          // Check old password
          const isOldPasswordValid = await bcrypt.compare(oldPassword, userPassword);
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
            setOldPassword('');
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
      

  const fetchUserData = async (role, userId) => {
    try {
        let response;
        switch (role) {
            case 'doctor':
            response = await fetch(`${URL}doctors/${userId}`);
            break;
            case 'patient':
            response = await fetch(`${URL}patients/${userId}`);
            break;
            case 'IT staff':
            case 'front desk':
            response = await fetch(`${URL}staff/${userId}`);
            break;
            default:
            alert('Invalid user role');
            return null;
        }
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to fetch user data');
        }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  return (
    <div className='change-password-container'>
      <div id='ChangePasswordContent'>
        <form onSubmit={handleSubmit}>
          <div><h2>Change Password</h2></div>
          <div>
            <label htmlFor="oldPassword">Old Password:</label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
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
            <button type="submit" disabled={isSubmitting} id='change-password-button'>Change Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
