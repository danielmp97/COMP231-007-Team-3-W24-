import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import './NavigationBar.css';

function NavigationBar() {
  const location = useLocation();
  const isLoginRoute = location.pathname === '/login';

  if (isLoginRoute) {
    return null; 
  }

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/my-appointments">My Appointments</Link></li>
        <li><Link to="/create-appointment">New Appointment</Link></li>
        <li><Link to="/my-profile">My Profile</Link></li>
        <li><Link to="/create-user">Create User</Link></li>

        <li className="dropdown">
          <select onChange={handleDropdownChange} className="dropdown-select">
            <option value="">Navigate to...</option>
            <option value="patients">Patients</option>
            <option value="doctors">Doctors</option>
            <option value="staff">Staff</option>
          </select>
        </li>

        
        <li><button onClick={handleSignOut} className='signout-button'>Sign Out</button></li>
        
      </ul>
    </nav>
  );
}

function handleDropdownChange(event) {
  const selectedOption = event.target.value;
  if (selectedOption) {
    window.location.href = `/${selectedOption}`;
  }
}

function handleSignOut() {
  // Logic to handle sign out
}

export default NavigationBar;
