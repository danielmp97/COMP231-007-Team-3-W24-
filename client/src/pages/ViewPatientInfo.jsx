import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ViewPatientInfo.css'; 
import Swal from 'sweetalert2';

function ViewPatientInfo() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');
  const navigate = useNavigate();

  const [patientInfo, setPatientInfo] = useState(null);

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const response = await axios.get(`https://medlink-m2u5.onrender.com/patients/${userId}`);
        setPatientInfo(response.data);
      } catch (error) {
        console.error('Error fetching patient information:', error);
      }
    };

    if (userId) {
      fetchPatientInfo();
    }
  }, [userId]);

  const deletePatient = async () => {
    // Display confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this patient. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    // If user confirms deletion, proceed with deletion
    if (result.isConfirmed) {
      try {
        await axios.delete(`https://medlink-m2u5.onrender.com/patients/${userId}`);
        Swal.fire('Deleted!', 'Patient has been deleted.', 'success');
        navigate('/view-users'); 
      } catch (error) {
        console.error('Error deleting patient:', error);
      }
    }
  };

  if (!patientInfo) {
    return <div>No Patient Information</div>;
  }

  return (
    <div className="container">
      <h2 className="header">Patient Information</h2>
      <div className="patient-info">
        <p><strong>Name:</strong> {patientInfo.name}</p>
        <p><strong>Age:</strong> {patientInfo.age}</p>
        <p><strong>Gender:</strong> {patientInfo.gender}</p>
        <p><strong>Email:</strong> {patientInfo.email}</p>
        <p><strong>Phone:</strong> {patientInfo.phone}</p>
        <p><strong>Notes:</strong> {patientInfo.notes}</p>
      </div>
      <button className='delete-patient-button' onClick={deletePatient}>
        Delete Patient
      </button>
    </div>
  );
}

export default ViewPatientInfo;
