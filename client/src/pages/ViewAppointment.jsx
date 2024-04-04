import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./ViewAppointment.css";

const ViewAppointment = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [appointmentData, setAppointmentData] = useState(null);
  const [patient, setPatient] = useState(null);
  const [notes, setNotes] = useState('');
  const [renderApp, setRenderApp] = useState(false);
  const appointmentId = searchParams.get("id");

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/appointments/${appointmentId}`);
        if (response.status === 200) {
          setAppointmentData(response?.data);
          const patientData = await axios.get(`http://localhost:8000/patients/${response?.data?.patient}`);
          if (patientData.status === 200) {
            setPatient(patientData.data);
            setNotes(response.data.notes || ''); // Set notes from response or empty string
            setRenderApp(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadData();
  }, [appointmentId]);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const saveNotes = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/appointments/${appointmentId}`,
        { notes: notes }
      );
      if (response.status === 200) {
        console.log("Notes saved successfully");
      }
    } catch (err) {
      console.error("Error saving notes:", err);
    }
  };

  return (
    <>
      {renderApp && appointmentData && patient ? (
        <div className="viewContainer container">
          <div className={`heading`}>Appointment Details</div>

          <ul className={`appointmentData`}>
            <li>
              Appointment Date:{" "}
              {new Date(appointmentData.dateTime).toLocaleDateString()}
            </li>
            <li>
              Appointment Time:{" "}
              {new Date(appointmentData.dateTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </li>
            <li>Reason: {appointmentData.reason}</li>
            <li>
              Notes:{" "}
              <textarea
                value={notes}
                onChange={handleNotesChange}
                rows={4}
                cols={50}
              />
              <button onClick={saveNotes}>Save Notes</button>
            </li>
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
  

