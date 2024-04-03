import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import './ViewAppointment.css';

const ViewAppointment = () => {
  const [searchParams] = useSearchParams();
  const [appointmentData, setAppointmentData] = useState(null);
  const [patient, setPatient] = useState(null);
  const [patientExist, setPatientExist] = useState(true);
  const [renderApp, setRenderApp] = useState(false);
  const appointmentId = searchParams.get("id");

  const loadData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/appointments/${appointmentId}`
      );

      if (response.status === 200) {
        setAppointmentData(response?.data);
        const patientData = await axios.get(
          `http://localhost:8000/patients/${response?.data?.patient}`
        );

        if (patientData.status === 200) {
          setPatient(patientData.data);
          setPatientExist(true);
          setRenderApp(true);
        }
      }
    } catch (err) {
      console.log(err);
      setPatientExist(false); 
      setRenderApp(true); 
    }
  };

  useEffect(() => {
    loadData();
  }, []); 

  return (
    <>
      {renderApp ? (
        <div className="viewContainer container">
          {patientExist ? (
            <>
              <div className={`heading`}>Appointment Details</div>
              <ul className={`appointmentData`}>
                <li>Appointment Date: {new Date(appointmentData.dateTime).toLocaleDateString()}</li>
                <li>Appointment Time:
                  {new Date(appointmentData.dateTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </li>
                <li>Reason: {appointmentData.reason}</li>
                <li>Notes: {appointmentData.notes}</li>
                <li>Doctor Name: {appointmentData.doctorName}</li>
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
            </>
          ) : (
            <div>
              <h2>Patient Data Not Found</h2>
              <h2>Patient may have been deleted</h2>  
            </div>
          )}
        </div>
      ) : (
        <div className="container">
          <div className="heading">Loading ...</div>
        </div>
      )}
    </>
  );
};

export default ViewAppointment;
