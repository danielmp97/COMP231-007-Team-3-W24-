import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import './NavigationBar.css';
import logo from '../assets/logo.png'; // Import your logo image file

function NavigationBar() {
  const location = useLocation();
  const isLoginRoute = location.pathname === '/login';

  if (isLoginRoute) {
    return null; 
  }

  return (
    <nav className="nav">
      <img src={logo} alt="Logo" className="logo" />
      <div className="nav-options">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/my-appointments">My Appointments</Link></li>
          <li><Link to="/create-appointment">New Appointment</Link></li>
          <li><Link to="/my-profile">My Profile</Link></li>
        </ul>
      </div>
      <button onClick={handleSignOut} className='signout-button'>Sign Out</button>
    </nav>
  );
}

function handleSignOut() {
  // Logic to handle sign out
}

export default NavigationBar;
