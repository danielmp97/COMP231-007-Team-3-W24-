import React from 'react';
import './Doctor.css';
import { Link } from 'react-router-dom';

function Doctor() {
    const userType = 'doctor'; 
    if (userType !== 'doctor') {
      return <Redirect to="/" />;
    }
  return (
    <div>
      {/* Navigation */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/doctors">Doctors</Link>
          </li>
          {/* Add other navigation links here */}
        </ul>
      </nav>
      
      {/* Body */}
      <div>
        <h1>Doctors Page</h1>
        <p>This is the Doctor's page. Add your content here.</p>
      </div>
    </div>
  );
}

export default Doctor;
