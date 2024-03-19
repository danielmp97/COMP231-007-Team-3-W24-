import React, { useState } from 'react';
import './CreateAppointment.css'; 

function CreateAppointment() {
  const [formData, setFormData] = useState({
    doctor: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
  });

  const doctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams']; // Example list of doctors
  const appointmentTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

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
            {appointmentTimes.map((time, index) => (
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
