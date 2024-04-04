import React, { useState, useEffect } from 'react';
import './Appointments.css';
import { get } from 'mongoose';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from "universal-cookie";

function Appointments() {
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([]);
  const [renderApp,setRenderApp]=useState(false)
  const URL = 'http://localhost:8000/';

  useEffect(() => {
    const getAppointments = async () => {
      try {
        setRenderApp(false)
        const response = await fetch(URL + 'appointments');
        const data = await response.json();
        setAppointments(data);
        setRenderApp(true)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getAppointments();
  }, []);

  const cancelAppointment = async(id) =>{
    setRenderApp(false)
   try{
      const cookies = new Cookies(null, { path: "/" });
      const token = cookies.get("token");
      console.log(token)
      const response = await axios.put(`http://localhost:8000/appointments/${id}`,{
      status:"canceled"
      },{
      headers:{
      Authorization:`Bearer ${token}`
    }
  })

if(response.status==200){
  Swal.fire({
    title:"Successfully canceled the appointment",
    icon:"success",
    confirmButtonText:"Ok"
  })
  setAppointments(prevAppointments =>
    prevAppointments.filter(appointment => appointment._id !== id)
  );
  setRenderApp(true)
}
   }
   catch(err){
    setRenderApp(true)
    Swal.fire({
      title:"Some problem occured",
      icon:'error',
      confirmButtonText:"Ok"
    })
   }
  }


  return (
  <>
  {
    renderApp?(
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
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
{appointments.map((appointment, index) => (
  <tr key={index}>
    {/* {console.log(appointment)} */}
    <td>{appointment.patientName}</td>
    <td>{appointment.doctorName}</td>
    <td>{new Date(appointment.dateTime).toLocaleDateString()}</td>
    <td>{new Date(appointment.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
    <td>{appointment.reason}</td>
    <td>{appointment.status?appointment.status:'Pending'}</td>
    <td><button onClick={(e)=>navigate(`/view-appointment?id=${appointment._id}`)}>View</button> <button onClick={(e)=>{

        Swal.fire({
          title: "Are you sure you want to cancel the appointment?",
          text:"This action cannot be reverted",
          icon:"error",
          confirmButtonText: "Yes",
          cancelButtonText:"No",
          showCancelButton:true

        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
           cancelAppointment(appointment._id)
          }
        });


    }

    }>Cancel</button></td>
  </tr>
))}
</tbody>

    </table>
      </div>
  </div>
    ):(
      <div className='text-white'>Loading</div>
    )
  }
  </>
  );
}

export default Appointments;