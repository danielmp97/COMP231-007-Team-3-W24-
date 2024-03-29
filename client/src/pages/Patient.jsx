import React from 'react';
import './Patient.css';
import { Link } from 'react-router-dom';

function Patient() {
    const userType = 'patient'; 
    if (userType !== 'patient') {
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
            <Link to="/patients">Patients</Link>
          </li>
          {/* Add other navigation links here */}
        </ul>
      </nav>
      
      {/* Body */}
      <div>
        <h1>Patients Page</h1>
        <p>This is the Patient's page. Add your content here.</p>
      </div>
    </div>
  );
}

export default Patient;
