import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ChangeEmail.css'; 
import { FaArrowAltCircleRight } from 'react-icons/fa'; // Importing icon from react-icons library

function ChangeEmail() {
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [confirmNewEmail, setConfirmNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  // Function to handle submission of the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(oldEmail) || !emailRegex.test(newEmail) || newEmail !== confirmNewEmail) {
      alert('Please enter valid email addresses and ensure new emails match.');
      return;
    }

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
        setConfirmNewEmail('');
        setPassword('');
        setVerificationSuccess(false); // Reset verification success state
      } else {
        alert('Successfully changed email!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle changes in the old email and password inputs
  const handleInputChanges = () => {
    if (oldEmail.trim() && password.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  // Function to handle verification of old email and password
  const handleVerify = async () => {
    // Implement code verification for old email and password
    // You can add your verification logic here
    setVerificationInProgress(true); // Set verification in progress
    try {
      // Simulate API call delay for 3 seconds
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Assuming verification succeeds after 3 seconds
      setVerificationSuccess(true);
    } catch (error) {
      console.error('Error:', error);
      setVerificationSuccess(false);
    } finally {
      setVerificationInProgress(false); // Set verification complete
    }
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
              onChange={(e) => {setOldEmail(e.target.value); handleInputChanges();}}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {setPassword(e.target.value); handleInputChanges();}}
              required
            />
            <button type="button" onClick={handleVerify}>Verify</button>
          </div>
          {verificationInProgress && <p className="verificationMessage">Verifying...</p>}
          {verificationSuccess && !verificationInProgress && (
            <p className="verificationMessage">Verification successful!</p>
          )}
          {verificationSuccess === false && !verificationInProgress && (
            <p className="verificationMessage">Verification failed!</p>
          )}
          <p className="notification">Please enter a valid email format (e.g., example@example.com).</p>
          <div>
            <label htmlFor="newEmail">New Email:</label>
            <input
              type="email"
              id="newEmail"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              disabled={!verificationSuccess || verificationInProgress}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmNewEmail">Confirm New Email:</label>
            <input
              type="email"
              id="confirmNewEmail"
              value={confirmNewEmail}
              onChange={(e) => setConfirmNewEmail(e.target.value)}
              disabled={!verificationSuccess || verificationInProgress}
              required
            />
          </div>
          <br />
          <div className="formButtons">
            <button type="submit" disabled={isButtonDisabled || isSubmitting}><FaArrowAltCircleRight /> Submit</button>
          </div>
          <div>
            <p>Go back to <Link to="/login">login</Link>.</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangeEmail;
