import React, { useState, useEffect } from 'react';
import './CreateAppointment.css'; 
import { jwtDecode } from "jwt-decode";

function CreateAppointment() {

  const getToken = () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
    return token;
  };

  const userType = jwtDecode(getToken()).role;
  //get the user id
  const userId = jwtDecode(getToken()).userId;

  const [appointments, setAppointments] = useState([]);
  const [patientsDB, setPatients] = useState([]);
  const [doctorsDB, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedPatientId, setselectedPatientId] = useState('');
  const URL = 'http://localhost:8000/';

  //Get apointments list
  useEffect(() => {
    const getAppointments = async () => {
      try {
        const response = await fetch(URL + 'appointments');
        const data = await response.json();
        console.log(data);
  
        setAppointments(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    getAppointments();
  }, []);

  //Get patient list
  useEffect(() => {
    const getPatients = async () => {
      try {
        const response = await fetch(URL + 'patients');
        const data = await response.json();
        console.log(data);
  
        setPatients(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    getPatients();
  }, []);

  //Get doctor list
  useEffect(() => {
    const getDoctors = async () => {
      try {
        const response = await fetch(URL + 'doctors');
        const data = await response.json();
        console.log(data);
  
        setDoctors(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    getDoctors();
  }, []);
  
  const [formData, setFormData] = useState({
    doctor: '',
    patient: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
  });

  const doctors = doctorsDB.map(doctor => ({
    id: doctor._id, 
    name: doctor.name
  }));

  const patients = patientsDB.map(patient => ({
    id: patient._id, 
    name: patient.name
  }));

  // Define the start and end hours
  const startHour = 4; // 9:00 AM
  const endHour = 19;  // 7:00 PM

  // Generate all possible hours within the range
  const allHours = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    allHours.push(hour);
  }

  // Convert all hours to two-digit format with leading zeros
  const allHoursFormatted = allHours.map(hour => {
    const timeString = new Date(0, 0, 0, hour).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return timeString;  
  });

  // Filter out the hours that are in the appointmentTimes array
  const appointmentTimes = appointments.map(appointment => 
    new Date(appointment.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
  );
  
  const availableTimes  = allHoursFormatted.filter(hour => !appointmentTimes.includes(hour));
    
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    // If the name of the field being changed is "doctor", update the selected doctor's ID
    if (name === 'doctor') {
      setSelectedDoctorId(value);
    }else if(name === 'patient'){
      setselectedPatientId(value);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log("User type in handleSubmit:", userType);
      console.log("User ID in handleSubmit:", userId);
      console.log("Patient ID in handleSubmit:", selectedPatientId);
      const [time, period] = formData.appointmentTime.split(' ');
      const [hours, minutes] = time.split(':');
      // Convert time to 24-hour format
      let hours24 = parseInt(hours, 10);
      if (period.toLowerCase() === 'pm' && hours24 !== 12) {
        hours24 += 12;
      } else if (period.toLowerCase() === 'am' && hours24 === 12) {
        hours24 = 0;
      }
  
      // Create a new Date object with the appointment date and time
      const appointmentDateTime = new Date(formData.appointmentDate);
      appointmentDateTime.setHours(hours24, parseInt(minutes, 10), 0, 0);
  
      let appointmentData;

      if(userType === "patient"){
        console.log("It is getting into the shit!")
        appointmentData = {
          doctor: selectedDoctorId,
          patient: userId,
          dateTime: appointmentDateTime, // Use the combined date and time object directly
          reason: formData.reason,
        };
      }else if(userType === "doctor"){
        appointmentData = {
          doctor: userId,
          patient: selectedPatientId,
          dateTime: appointmentDateTime, // Use the combined date and time object directly
          reason: formData.reason,
        };
      }

      console.log(appointmentData);
  
      const response = await fetch('http://localhost:8000/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });
  
      if (response.ok) {
        console.log('Appointment created successfully');
      } else {
        console.error('Failed to create appointment');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="container">
      <h2 className="header">Create Appointment</h2>
      <h2 className="header">{userType}</h2>
      <form onSubmit={handleSubmit}>
      {userType === 'patient' &&
        <div className="form-group">
          <label className="form-label">Select Doctor:</label>
          <select
            className="full-width" 
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
          >
            <option value="">Select a doctor</option>
            {doctors.map((doctor, index) => (
              <option key={index} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>
      }
      {userType === 'doctor' &&
        <div className="form-group">
          <label className="form-label">Select Patient:</label>
          <select
            className="full-width" 
            name="patient"
            value={formData.patient}
            onChange={handleChange}
          >
            <option value="">Select a patient</option>
            {patients.map((patient, index) => (
              <option key={index} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>
      }
        <div className="form-group">
          <label className="form-label">Select Time:</label>
          <select
            className="full-width" 
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
          >
            <option value="">Select a time</option>
            {availableTimes.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Appointment Date:</label>
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Reason:</label>
          <textarea className="reason-textarea"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Appointment</button>
      </form>
    </div>
  );
}

export default CreateAppointment;
