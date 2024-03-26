import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import  './ViewAppointment.css'

const ViewAppointment = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [appintmentData,setAppointmentData]=useState()
  const [patient,setPatient]=useState()
  const [renderApp, setRenderApp] = useState(false);
  const appointmentId = searchParams.get("id");


  console.log(appointmentId);
  const loadData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/appointments/${appointmentId}`
      );
      console.log(response);

      if (response.status === 200) {
       setAppointmentData(response?.data);
        const patientData = await axios.get(
          `http://localhost:8000/patients/${response?.data?.patient}`
        );

        if (response.status === 200) {
        }
        setPatient(patientData.data);
        setRenderApp(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      {renderApp ? (
        <div className="viewContainer container">
            {console.log(patient)}
          <div className={`heading`}>Appointment Details</div>

          <ul className={`appointmentData`}>
            <li>Appointment Date: {new Date(appintmentData.dateTime).toLocaleDateString()}</li>
            <li>Appointment Time:
              {new Date(appintmentData.dateTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </li>
            <li>Reason: {appintmentData.reason}</li>
            <li>Notes: {appintmentData.notes}</li>
            <li>Doctor Name: {appintmentData.doctorName}</li>
          </ul>

          <div className={`heading`}>Patient Details</div>
          <ul className={``}>
            <li>Patient Name: {patient.name}</li>
            <li>Email: {patient.email}</li>
            <li>Phone: {patient.phone}</li>
            <li>Gender: {patient.gender}</li>
            <li>Age: {patient.age}</li>
            <li>Notes: {patient.notes}</li>
           
          </ul>
          
        </div>
      ):(

        <div className="container">
            <div className="heading">Loading ...</div>
        </div>
      )
      }
    </>
  );
};

export default ViewAppointment;
