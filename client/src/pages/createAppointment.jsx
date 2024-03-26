import React, { useState, useEffect } from 'react';
import './CreateAppointment.css'; 

function CreateAppointment() {


  const [appointments, setAppointments] = useState([]);
  const [doctorsDB, setDoctors] = useState([]);
  const URL = 'http://localhost:8000/';

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
    specialty: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
  });

  const doctors = appointments.map(appointment => appointment.doctorName);
  const specialties = doctorsDB.map(doctorDB => doctorDB.specialty);

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
    console.log(formData);
    // API calls to send the form data to the server
  };

  return (
    <div className="container">
      <h2 className="header">Create Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Select Specialty:</label>
          <select
            className="full-width" 
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
          >
            <option value="">Select a specialty</option>
            {specialties.map((specialty, index) => (
              <option key={index} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>
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
              <option key={index} value={doctor}>
                {doctor}
              </option>
            ))}
          </select>
        </div>
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
