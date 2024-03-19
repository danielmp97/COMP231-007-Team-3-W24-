import React from 'react';
import { Link } from 'react-router-dom'; 
import './NavigationBar.css';

function NavigationBar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/my-appointments">My Appointments</Link></li>
        <li><Link to="/create-appointment">New Appointment</Link></li>
        <li><Link to="/my-profile">My Profile</Link></li>
        <li><button onClick={handleSignOut} className='signout-button'>Sign Out</button></li>
      </ul>
    </nav>
  );
}

function handleSignOut() {
  // Logic to handle sign out
}

export default NavigationBar;
