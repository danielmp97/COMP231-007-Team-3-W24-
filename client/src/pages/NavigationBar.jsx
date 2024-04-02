import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom'; 
import './NavigationBar.css';
import logo from '../assets/logo.png'; 
import { jwtDecode } from "jwt-decode";

function NavigationBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const getToken = () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    return token ? token.split('=')[1] : null;
  };

  const token = getToken();
  const userType = token ? jwtDecode(token).role : null;

  const isLoginRoute = location.pathname === '/login';

  if (isLoginRoute) {
    return null; 
  }

  const handleSignOut = () => {
    //clear cookie
    document.cookie = 'token=; expires=' + new Date().toUTCString() + '; path=/;';
    // Redirect the user to the login page after signing out
    navigate('/login');
  };

  const renderAdditionalButtons = () => {
    if (userType === "IT staff") {
      return (
        <>
          <li><Link to="/view-users">User List</Link></li>
          <li><Link to="/create-user">Create User</Link></li>
        </>
      );
    }
    return null;
  };

  return (
    <nav className="nav">
      <img src={logo} alt="Logo" className="logo" />
      <div className="nav-options">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/my-appointments">My Appointments</Link></li>
          <li><Link to="/create-appointment">New Appointment</Link></li>
          <li><Link to="/my-profile">My Profile</Link></li>
          {renderAdditionalButtons()}
        </ul>
      </div>
      <button onClick={handleSignOut} className='signout-button'>Sign Out</button>
    </nav>
  );
}

export default NavigationBar;
