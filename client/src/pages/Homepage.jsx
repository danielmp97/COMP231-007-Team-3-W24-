import React, { useState } from 'react';
import './Homepage.css';
import { jwtDecode } from "jwt-decode";
import logo_slogan from '../assets/logo-slogan.png'; // Import your logo image file


function Homepage() {

  const getToken = () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
    return token;
  };

  const user = jwtDecode(getToken()).name;

  return (
    <div>
      <table id='home-message'>
        <tr>
          <td id='left-message'>
            <div className="homepage-header">
              <h1 id='welcome-text'>Hello!</h1>
              <h1 id='user-name'>{user}</h1>
              <h2 id='desctiption-text'>Welcome to Medical Appointment Scheduler</h2>
            </div>
          </td>
          <td id='right-message'>
            <div className="homepage-container">  
              <h1 id='title-container'>Your next appointment:</h1>
              <hr></hr>
            </div>
          </td>
        </tr>
      </table>
      {/* <h2>Welcome to Medical Appointment Scheduler</h2>
              <h3>How it works?</h3>
              <h3>This app allows you to easily schedule appointments with doctors.</h3>
              <p>To start, click on the button "New Appointment" to create a new appointment with the doctor of your choice.
                  Fill out the form and you're all set!
              </p> */}

    </div>
  );
}

export default Homepage;
