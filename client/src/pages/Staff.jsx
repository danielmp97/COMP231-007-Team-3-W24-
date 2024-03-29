import React from 'react';
import './Staff.css';
import { Link } from 'react-router-dom';

function Staff() {
    
    const userType = 'staff'; 
    if (userType !== 'staff') {
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
            <Link to="/staff">Staff</Link>
          </li>
          {/* Add other navigation links here */}
        </ul>
      </nav>
      
      {/* Body */}
      <div>
        <h1>Staff Page</h1>
        <p>This is the Staff's page. Add your content here.</p>
      </div>
    </div>
  );
}

export default Staff;
