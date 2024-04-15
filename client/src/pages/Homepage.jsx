import React, { useState, useEffect } from 'react';
import './Homepage.css';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom'; 

function Homepage() {

  const [nextAppointments, setNextAppointments] = useState([]);
  const [isDoctor, setIsDoctor] = useState(false); 
  const [isPatient, setIsPatient] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [userType, setUserType] = useState(''); 
  const URL = 'https://medlink-m2u5.onrender.com/'; //This constant needs to change when the application is deployed

  const getToken = () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
    return token;
  };

  const user = jwtDecode(getToken()).name;

  const userId = jwtDecode(getToken()).userId;
  console.log(userId);

  useEffect(() => {
    const userType = jwtDecode(getToken()).role;
    setUserType(userType); // Set the userType state

    if (userType === 'doctor') {
      setIsDoctor(true);
    } else if (userType === 'patient') {
      setIsPatient(true);
    } else if (userType === 'front desk' || userType === 'IT staff') {
      setIsStaff(true);
    }

    const getNextAppointments = async () => {
      try {
        const response = await fetch(URL + 'appointments');
        const data = await response.json();
        console.log(data);
        
        if (data.length > 0) {
          // Filter appointments for the current day
          const currentDate = new Date().toLocaleDateString();
          console.log(currentDate);
          let filteredAppointments = [];

          if (isDoctor) {
            // Filter appointments for the current doctor
            filteredAppointments = data.filter(appointment => appointment.doctor === userId);
          } else if (isPatient) {
            // Filter appointments for the current patient
            filteredAppointments = data.filter(appointment => appointment.patient === userId);
          } else if (isStaff) {
            // Filter appointments for all users
            filteredAppointments = data;
          }

          // Filter appointments for the current day
          filteredAppointments = filteredAppointments.filter(appointment => new Date(appointment.dateTime).toLocaleDateString() === currentDate);

          // Sort appointments by time
          const sortedAppointments = filteredAppointments.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
          
          // Set the next appointments
          setNextAppointments(sortedAppointments);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getNextAppointments();
  }, [isDoctor, isPatient, isStaff]); 

  const navigate = useNavigate(); // Define the navigate function

  const handleNewAppointment = () => {
    // Redirect the user to the new Appointment page after signing out
    navigate('/create-appointment');
  };

  const handleAllAppointments = () => {
    // Redirect the user to the all Appointments page after signing out
    navigate('/my-appointments');
  };

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
              <h1 id='desctiption-text'>You are logged in as: {userType}</h1>
            </div>
          </td>
          <td id='right-message'>
            <div className="homepage-container">  
              {(userType === 'doctor' || userType === 'patient') && <h1 id='title-container'>Your next appointment:</h1>}
              {(userType === 'front desk' || userType === 'IT staff') && <h1 id='title-container'>Today's appointments:</h1>}
              <hr></hr>
              {nextAppointments.length > 0 ? (
                <div>
                  <table id='next-appointment-info'>
                    <tbody>
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
                    {nextAppointments.map((appointment, index) => (
                      <tr key={index}>
                        <td id='patient-col'>
                          {appointment.patientName}
                        </td>
                        <td id='doctor-col'>
                          {appointment.doctorName}
                        </td>
                        <td id='date-col'>
                          {new Date(appointment.dateTime).toLocaleDateString()}
                        </td>
                        <td id='time-col'>
                          {new Date(appointment.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td id='reason-col'>
                          {appointment.reason}
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div>No appointments for today</div>
              )}
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan="2" id='button-section'>
            {/* <button id='btn-cancel'>Cancel Appointment</button> */}
            <button onClick={handleNewAppointment} id='btn-new'>Book a New Appointment</button>
            <button onClick={handleAllAppointments} id='btn-viewAll'>View All My Appointments</button>
          </td>
        </tr>
      </tbody>
      </table>
    </div>
  );
}

export default Homepage;
