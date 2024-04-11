import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import bcrypt from 'bcryptjs';
import Swal from 'sweetalert2';
import './ChangeEmail.css'; 
import { set } from 'mongoose';

function ChangeEmail() {
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
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
  
    try {
      const userData = await fetchUserData(role);
      if (!userData) {
        alert('User data not found');
        return;
      }
  
      const userPassword = userData.password;
      const userEmail = userData.email;
  
      if (oldEmail === newEmail) {
        Swal.fire({
          icon: 'warning',
          title: 'Warning',
          text: 'Old email and new email must be different',
        });
        return;
      }
  
      // Check if password is correct
      const isPasswordValid = await bcrypt.compare(password, userPassword);
      if (!isPasswordValid) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid password',
        });
        return;
      }

      // Update the email
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
          break;
      }
      const updatedUser = { email: newEmail };
      const updateResponse = await fetch(updateUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      if (updateResponse.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Email updated successfully',
        });
        setTimeout(() => {
          window.location.href = '/my-profile';
        }, 1000);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error updating email',
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const fetchUserData = async (userType) => {
    let response;
    if (userType === 'doctor' || userType === 'patient') {
      response = await fetch(`${URL}${userType}s/${userId}`);
    } else if (userType === 'IT staff' || userType === 'front desk') {
      response = await fetch(`${URL}staff/${userId}`);
    }
    if (response.ok) {
      return await response.json();
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
