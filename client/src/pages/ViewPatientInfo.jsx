import React from 'react';
import { useParams } from 'react-router-dom';
import './ViewPatientInfo.css'; 

function ViewPatientInfo() {
  const { appointmentId } = useParams();

  const patientInfo = {
    name: 'Patient Name',
    age: 30,
    gender: 'Male',
    email: 'patient@example.com',
    phone: '123-456-7890',
    // Add more patient details as needed
  };

  return (
    <div className="container">
      <h2 className="header">Patient Information</h2>
      <div className="patient-info">
        <p><strong>Name:</strong> {patientInfo.name}</p>
        <p><strong>Age:</strong> {patientInfo.age}</p>
        <p><strong>Gender:</strong> {patientInfo.gender}</p>
        <p><strong>Email:</strong> {patientInfo.email}</p>
        <p><strong>Phone:</strong> {patientInfo.phone}</p>
        {/* Add more patient information here */}
      </div>
    </div>
  );
}

export default ViewPatientInfo;