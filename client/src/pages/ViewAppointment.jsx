import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2'
import './ViewAppointment.css';

const ViewAppointment = () => {
  const [searchParams] = useSearchParams();
  const [appointmentData, setAppointmentData] = useState(null);
  const [patient, setPatient] = useState(null);
  const [patientExist, setPatientExist] = useState(true);
  const [renderApp, setRenderApp] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [appointmentNotes, setAppointmentNotes] = useState('');
  const [patientNotes, setPatientNotes] = useState('');
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
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
    const userType = jwtDecode(token).role;
    if (userType === 'doctor') {
      setIsDoctor(true);
    }
    loadData();
  }, []); 

  const handleAddAppointmentNotes = async () => {
    const { value: notes } = await Swal.fire({
      title: 'Add Appointment Notes',
      input: 'textarea',
      inputValue: appointmentData?.notes || '', 
      inputPlaceholder: 'Type your notes here...',
      showCancelButton: true,
    });

    if (notes) {
      try {
        await axios.put(`http://localhost:8000/appointments/${appointmentId}/notes`, { notes });
        setAppointmentNotes(notes);
        Swal.fire('Notes Added!', '', 'success');
        window.location.reload();
      } catch (error) {
        console.error('Error adding appointment notes:', error);
        Swal.fire('Error!', 'Failed to add notes', 'error');
      }
    }
  };

  const handleAddPatientNotes = async () => {
    const { value: notes } = await Swal.fire({
      title: 'Add Patient Notes',
      input: 'textarea',
      inputValue: patient?.notes || '', // Pre-fill with existing notes
      inputPlaceholder: 'Type your notes here...',
      showCancelButton: true,
    });

    if (notes) {
      try {
        await axios.put(`http://localhost:8000/patients/${patient._id}`, { notes });
        setPatientNotes(notes);
        Swal.fire('Notes Added!', '', 'success');
        window.location.reload();
      } catch (error) {
        console.error('Error adding patient notes:', error);
        Swal.fire('Error!', 'Failed to add notes', 'error');
      }
    }
  };

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
              <div>
              {isDoctor && (
                  <button className="buttons-for-doctors" onClick={handleAddAppointmentNotes}>
                    Add Notes to Appointment
                  </button>
                )}
              </div>

              <div className={`heading`}>Patient Details</div>
              <ul className={``}>
                <li>Patient Name: {patient.name}</li>
                <li>Email: {patient.email}</li>
                <li>Phone: {patient.phone}</li>
                <li>Gender: {patient.gender}</li>
                <li>Age: {patient.age}</li>
                <li>Notes: {patient.notes}</li>
              </ul>
              <div>
              {isDoctor && (
                  <button className="buttons-for-doctors" onClick={handleAddPatientNotes}>
                    Add Notes to Patient
                  </button>
                )}
              </div>
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
