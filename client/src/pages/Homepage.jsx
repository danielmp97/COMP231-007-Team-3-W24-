import React, { useState, useEffect } from 'react';
import './Homepage.css';
import { jwtDecode } from "jwt-decode";

function Homepage() {
  const [lastAppointment, setLastAppointment] = useState(null);
  const URL = 'http://localhost:8000/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch appointments
        const response = await fetch(URL + 'appointments');
        const data = await response.json();
        console.log(data);

        // Find the last appointment
        const last = data[data.length - 1];
        setLastAppointment(last);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData(); // Call fetchData when the component mounts

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to ensure useEffect runs only once

  // Get user name from decoded token
  const user = jwtDecode(document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1]).name;

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
              <hr />
              {lastAppointment && (
                <div>
                  <p>Patient Name: {lastAppointment.patientName}</p>
                  <p>Doctor: {lastAppointment.doctorName}</p>
                  <p>Date: {new Date(lastAppointment.dateTime).toLocaleDateString()}</p>
                  <p>Time: {new Date(lastAppointment.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  <p>Reason: {lastAppointment.reason}</p>
                </div>
              )}
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default Homepage;
