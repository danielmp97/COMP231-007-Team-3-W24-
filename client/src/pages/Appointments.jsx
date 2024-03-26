import React, { useState, useEffect } from 'react';
import './Appointments.css';
import { get } from 'mongoose';
import { useNavigate } from "react-router-dom";

function Appointments() {
  const navigate = useNavigate()
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
        <h1>My Appointments</h1>
      <table>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Reason</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  {appointments.map((appointment, index) => (
    <tr key={index}>
      {console.log(appointment)}
      <td>{appointment.patientName}</td>
      <td>{appointment.doctorName}</td>
      <td>{new Date(appointment.dateTime).toLocaleDateString()}</td>
      <td>{new Date(appointment.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
      <td>{appointment.reason}</td>
      <td><button onClick={(e)=>navigate(`/viewAppointment?id=${appointment._id}`)}>View</button></td>
    </tr>
  ))}
</tbody>

      </table>
        </div>
    </div>
  );
}

export default Appointments;
