import React, { useState, useEffect } from 'react';
import './Appointments.css';

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const sampleAppointments = [
      {
        patientName: 'John Doe',
        doctor: 'Dr. Smith',
        date: '2024-03-20',
        time: '10:00 AM',
        reason: 'Checkup'
      },
      {
        patientName: 'Jane Smith',
        doctor: 'Dr. Johnson',
        date: '2024-03-22',
        time: '2:00 PM',
        reason: 'Follow-up'
      },
    ];

    setAppointments(sampleAppointments);
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
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.patientName}</td>
              <td>{appointment.doctor}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
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
