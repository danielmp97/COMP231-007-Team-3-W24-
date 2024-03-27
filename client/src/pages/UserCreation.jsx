// UserCreation.jsx

import React, { useState } from 'react';
import './UserCreation.css'; // Import CSS file

function UserCreation() {
  // State for form fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState(''); // Add phone state
  const [gender, setGender] = useState(''); // Add gender state
  const [age, setAge] = useState(''); // Add age state
  const [specialty, setSpecialty] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Call API to create user with form data
    console.log('Form submitted:', { username, password, email, role, phone, gender, age });
    // Reset form fields
    setUsername('');
    setPassword('');
    setEmail('');
    setRole('');
    setPhone('');
    setGender('');
    setAge('');
    setSpecialty('');
  };

  // Function to handle role selection
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  // Function to render form fields based on selected role
  const renderFormFields = () => {
    switch (role) {
      case 'patient':
        return (
          <>
            <div>
              <label>Name:</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label>Phone:</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <label>Gender:</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label>Age:</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </>
        );
        case 'doctor':
        return (
          <>
            <div>
              <label>Name:</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label>Phone:</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <label>Specialty:</label>
              <input type="text" value={specialty} onChange={(e) => setSpecialty(e.target.value)} />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </>
        );
      case 'staff':
        return (
          <>
            <div>
              <label>Name:</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="user-creation-container">
      <h2>Create New User</h2>
      <div className="role-buttons">
        <button onClick={() => handleRoleSelect('patient')}>Create Patient</button>
        <button onClick={() => handleRoleSelect('doctor')}>Create Doctor</button>
        <button onClick={() => handleRoleSelect('staff')}>Create Staff</button>
      </div>
      <form onSubmit={handleSubmit}>
        {renderFormFields()}
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default UserCreation;
