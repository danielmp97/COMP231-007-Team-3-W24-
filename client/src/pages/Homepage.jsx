import React, { useState, useEffect } from 'react';
import './Homepage.css';
import { jwtDecode } from "jwt-decode";

function Homepage() {

  const [lastAppointment, setLastAppointment] = useState(null);
  const URL = 'http://localhost:8000/'; //This constant needs to change when the application is deployed

  const getToken = () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
    return token;
  };
  const user = jwtDecode(getToken()).name;
  const userType = jwtDecode(getToken()).role;

  useEffect(() => {
    const getLastAppointment = async () => {
      try {
        const response = await fetch(URL + 'appointments');
        const data = await response.json();
        if (data.length > 0) {
          // Sort appointments by date in descending order
          const sortedAppointments = data.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
          // Set the last appointment
          setLastAppointment(sortedAppointments[0]);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getLastAppointment();
  }, []);

  return (
    <div>
      <table id='home-message'>
      <tbody>
        <tr>
          <td id='left-message'>
            <div className="homepage-header">
              <h1 id='welcome-text'>Hello!</h1>
              <h1 id='user-name'>{user}</h1>
              <h2 id='desctiption-text'>Welcome to MedLink, schedule your health today!</h2>
              <h1 id='user-name'>{userType}</h1>
            </div>
          </td>
          <td id='right-message'>
            <div className="homepage-container">  
              <h1 id='title-container'>Your next appointment:</h1>
              <hr></hr>
              {lastAppointment && (
                <div>
                  <table id='next-appointment-info'>
                    <tr>
                      <th>
                        Patient Name:
                      </th>
                      <th>
                        Doctor:
                      </th>
                      <th>
                        Date:
                      </th>
                      <th>
                        Time:
                      </th>
                      <th>
                        Reason:
                      </th>
                    </tr>
                    <tr>
                      <td id='patient-col'>
                        {lastAppointment.patientName}
                      </td>
                      <td id='doctor-col'>
                        {lastAppointment.doctorName}
                      </td>
                      <td id='date-col'>
                        {new Date(lastAppointment.dateTime).toLocaleDateString()}
                      </td>
                      <td id='time-col'>
                        {new Date(lastAppointment.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td id='reason-col'>
                        {lastAppointment.reason}
                      </td>
                    </tr>
                  </table>
                </div>
              )}
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan="2" id='button-section'>
            <button id='btn-cancel'>Cancel Appointment</button>
            <button id='btn-new'>Book a New Appointment</button>
            <button id='btn-viewAll'>View All My Appointments</button>
          </td>
        </tr>
      </tbody>
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