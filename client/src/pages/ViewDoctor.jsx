import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewDoctor.css'; 
import Swal from 'sweetalert2';
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

function ViewDoctor() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole]=useState();

  const URL = 'https://medlink-m2u5.onrender.com';

  useEffect(() => {
    const cookies = new Cookies(null, { path: "/" });
    const token = cookies.get("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.role === "IT staff" || decoded.role === "front desk") {
        setRole(decoded.role);
      }
    }

    const searchParams = new URLSearchParams(window.location.search);
    const userId = searchParams.get('userId');

    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`${URL}doctors/${userId}`);
        setDoctor(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching doctor:', error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchDoctor();
    }
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  const deleteDoctor = async () => {
    // Display confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this doctor. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    // If user confirms deletion, proceed with deletion
    if (result.isConfirmed) {
      try {
        await axios.delete(`${URL}doctors/${doctor._id}`);
        Swal.fire('Deleted!', 'Doctor has been deleted.', 'success');
        window.location.href = '/view-users'; 
      } catch (error) {
        console.error('Error deleting doctor:', error);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="header">Doctor Information</h2>
      {doctor ? (
        <div className="doctor-card">
          <p><strong>Name:</strong> {doctor.name}</p>
          <p><strong>Email:</strong> {doctor.email}</p>
          <p><strong>Phone:</strong> {doctor.phone}</p>
          <p><strong>Specialty:</strong> {doctor.specialty}</p>
          {(role === 'IT staff') && <button className='delete-doctor-button' onClick={deleteDoctor}>
            Delete Doctor
          </button>}
        </div>
      ) : (
        <div>No doctor found</div>
      )}
    </div>
  );
}

export default ViewDoctor;
