import React, { useState } from 'react';
import './Homepage.css';
import { jwtDecode } from "jwt-decode";

function Homepage() {

  const getToken = () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
    return token;
  };

  const user = jwtDecode(getToken()).name;

  return (
    <div>
        <div className="homepage-container">  
            {/* <h1>Hello {user}</h1> */}
            <h2>Welcome to Medical Appointment Scheduler</h2>
            <h3>How it works?</h3>
            <h3>This app allows you to easily schedule appointments with doctors.</h3>
            <p>To start, click on the button "New Appointment" to create a new appointment with the doctor of your choice.
                Fill out the form and you're all set!
            </p>
        </div>
    </div>
  );
}

export default Homepage;
