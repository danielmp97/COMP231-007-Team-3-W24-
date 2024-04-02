import React, { useState, useEffect } from 'react';
import './Appointments.css';
import { get } from 'mongoose';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const URL = 'http://localhost:8000/';

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const response = await fetch(URL + 'appointments');
        const data = await response.json();
        console.log(data);
  
        setAppointments(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    getAppointments();
  }, []);
  

  return (
    <div>
        <div className="table-container">
        <h1 className='my-appointments'>My Appointments</h1>
      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
  {appointments.map((appointment, index) => (
    <tr key={index}>
      <td>{appointment.patientName}</td>
      <td>{appointment.doctorName}</td>
      <td>{new Date(appointment.dateTime).toLocaleDateString()}</td>
      <td>{new Date(appointment.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
      <td>{appointment.reason}</td>
    </tr>
  ))}
</tbody>

      </table>
        </div>
    </div>
  );
}

export default Appointments;
