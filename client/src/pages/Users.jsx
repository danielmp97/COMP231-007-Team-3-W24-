import React, { useState, useEffect } from 'react';
import './Appointments.css';
import { get } from 'mongoose';

function ViewUser() {
  const [users, SetUsers] = useState([]);
  const [renderApp,setRenderApp]=useState(false)
  const URL = 'http://localhost:8000/';

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const response = await fetch(URL + 'getAllUsers');
        const data = await response.json();
        console.log(data);
  
        SetUsers(data);
        setRenderApp(true)
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    getAppointments();
  }, []);
  

  return (
    <>
    {
        renderApp && (
            <div>
        <div className="table-container">
        <h1>Users ({users.length})</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Address</th>
           
          </tr>
        </thead>
        <tbody>
  {/* {appointments.map((appointment, index) => (
    <tr key={index}>
      <td>{appointment.patientName}</td>
      <td>{appointment.doctorName}</td>
      <td>{new Date(appointment.dateTime).toLocaleDateString()}</td>
      <td>{new Date(appointment.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
      <td>{appointment.reason}</td>
    </tr>
  ))} */}
  {
    users.map((data,index)=>(
        <tr key={index}>
            <td>{data.firstName}</td>
            <td>{data.lastName}</td>
            <td>{data.email}</td>
            <td>{data.address}</td>
        </tr>
    ))
  }
</tbody>

      </table>
        </div>
    </div>
        )
    }
    </>
  );
}

export default ViewUser;
