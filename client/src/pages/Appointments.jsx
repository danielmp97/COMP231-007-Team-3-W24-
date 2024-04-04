import React, { useState, useEffect } from 'react';
import './Appointments.css';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

function Appointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [renderApp, setRenderApp] = useState(false);
  const [tokenExist, setTokenExist] = useState(false);
  const [isPatient, setIsPatient] = useState(false); 
  const [isDoctor, setIsDoctor] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [userId, setUserId] = useState(null); 

  const URL = 'http://localhost:8000/';

  useEffect(() => {
    const checkTokenExistence = () => {
      const cookies = new Cookies(null, { path: "/" });
      const token = cookies.get("token");
      setTokenExist(!!token); 
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
      const id = decodedToken.userId;
      if (role === "patient") {
        setIsPatient(true);
        setUserId(id); 
      } else if (role === "doctor") {
        setIsDoctor(true);
        setUserId(id); 
      } else if (role === "IT staff" || role === "front desk") {
        setIsStaff(true);
        setUserId(id); 
      }
    };

    const getAppointments = async (userId) => {
      try {
        checkTokenExistence(); 
        if (!tokenExist) {
          setRenderApp(true);
          return;
        }
    
        setRenderApp(false);
        const response = await fetch(URL + 'appointments');
        const data = await response.json();
        console.log(data);
    
        let filteredAppointments = [];
    
        if (isPatient) {
          filteredAppointments = data.filter(appointment => appointment.patient === userId);
        } else if (isDoctor) {
          filteredAppointments = data.filter(appointment => appointment.doctor === userId);
        } else if (isStaff) {
          filteredAppointments = data;
        }
    
        setAppointments(filteredAppointments);
        setRenderApp(true);
      } catch (error) {
        console.error('Error:', error);
      }
    };    
    
    getAppointments(userId); 
  }, [tokenExist]); 

  const cancelAppointment = async (id) => {
    setRenderApp(false);
    try {
      const response = await fetch(`http://localhost:8000/appointments/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Successfully canceled the appointment",
          icon: "success",
          confirmButtonText: "Ok"
        });
        window.location.reload();
        setRenderApp(true);
      }
    } catch(err) {
      console.error(err);
      setRenderApp(true);
      Swal.fire({
        title: "Some problem occured",
        icon: 'error',
        confirmButtonText: "Ok"
      });
    }
  };
  
  return (
    <>
      {renderApp && tokenExist ? (
        <div>
          <div className="table-container">
            <h1 className='my-appointment-header'>My Appointments</h1>
            {appointments.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Doctor</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment, index) => (
                    <tr key={index}>
                      <td>{appointment.patientName}</td>
                      <td>{appointment.doctorName}</td>
                      <td>{new Date(appointment.dateTime).toLocaleDateString()}</td>
                      <td>{new Date(appointment.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                      <td>{appointment.reason}</td>
                      <td>{appointment.status ? appointment.status : 'Pending'}</td>
                      <td>
                        <button onClick={(e) => navigate(`/view-appointment?id=${appointment._id}`)} className='my-appointment-buttons'>View</button>
                        <button onClick={(e) => {
                          Swal.fire({
                            title: "Are you sure you want to cancel the appointment?",
                            text: "This action cannot be reverted",
                            icon: "error",
                            confirmButtonText: "Yes",
                            cancelButtonText: "No",
                            showCancelButton: true
                          }).then((result) => {
                            if (result.isConfirmed) {
                              cancelAppointment(appointment._id)
                            }
                          });
                        }} className='my-appointment-buttons'>Cancel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No appointments found</div>
            )}
          </div>
        </div>
      ) : (
        <div className='text-white'>{tokenExist ? 'Loading' : 'Access Denied'}</div>
      )}
    </>
  );
}

export default Appointments;