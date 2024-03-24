import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ChangeEmail.css'; 

function ChangeEmail() {
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [oldCode, setOldCode] = useState('');
  const [newCode, setNewCode] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle submission of the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(oldEmail) || !emailRegex.test(newEmail)) {
      alert('Please enter valid email addresses');
      return;
    }

    // Validate password complexity
    // Add your password validation logic here

    // Submit the form
    setIsSubmitting(true);
    try {
      // Send a request to update the email in the database
      const response = await fetch('/api/update-email', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldEmail,
          newEmail,
          password,
        }),
      });

      if (response.ok) {
        alert('Email change successful!');
        // Reset form fields
        setOldEmail('');
        setNewEmail('');
        setOldCode('');
        setNewCode('');
        setPassword('');
      } else {
        alert('Email change failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle verification of the old code
  const handleOldCodeVerification = () => {
    // Implement code verification for old email
    // You can add your verification logic here
  };

  // Function to handle verification of the new code
  const handleNewCodeVerification = () => {
    // Implement code verification for new email
    // You can add your verification logic here
  };

  return (
    <div id='ChangeEmailMainBox'>
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
            <input
              type="text"
              value={oldCode}
              onChange={(e) => setOldCode(e.target.value)}
              placeholder="Enter 4-digit code"
              required
            />
            <button type="button" onClick={handleOldCodeVerification}>Verify</button>
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
            <input
              type="text"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              placeholder="Enter 4-digit code"
              required
            />
            <button type="button" onClick={handleNewCodeVerification}>Verify</button>
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
            <button type="submit" disabled={isSubmitting}>Submit</button>
          </div>
          <div>
            <p>Go back to <Link to="/">home</Link>.</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangeEmail;
