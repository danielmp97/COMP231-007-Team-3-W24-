// UserCreation.jsx

import React, { useState } from 'react';
import './UserCreation.css'; // Import CSS file

function UserCreation() {
  // State for form fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Call API to create user with form data
    console.log('Form submitted:', { username, password, email, role });
    // Reset form fields
    setUsername('');
    setPassword('');
    setEmail('');
    setRole('');
  };

  return (
    <div className="user-creation-container">
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="staff">Staff</option>
          </select>
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default UserCreation;
