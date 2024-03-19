import React, { useState } from 'react';
import './Homepage.css';

function Homepage() {
  return (
    <div>
        <div className="homepage-container">
            <h1>Welcome to Medical Appointment Scheduler</h1>
            <h2>This app allows you to easily schedule appointments with doctors.</h2>
            <p>To start, click on the button "New Appointment" to create a new appointment with the doctor of your choice.
                Fill out the form and you're all set!
            </p>
        </div>
    </div>
  );
}
 export default Homepage;