import React, { useEffect, useState } from 'react';
import './CreateAppointment.css'; 
import axios from 'axios'

function CreateAppointment() {
  const [formData, setFormData] = useState({
    doctor: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
    patient: '', // New state variable for selected patient
  });

  const [patient,setPatient]=useState()

  const doctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams']; 
  const appointmentTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
  const patients = ['Patient A', 'Patient B', 'Patient C']; 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission, including patient data
    console.log(formData);
    // API calls to send the form data to the server
  };

  const loadData = async() =>{
    try{
      
      const response = await axios.get(`http://localhost:8000/patients`)
      const patient = []

      if(response.status==200){
         console.log(response.data)

         response.data.forEach((element)=>{
             patient.push({name:element.name,id:element._id})
         })

        setPatient(patient)
      }
      

    }
    catch(err){
      alert("Internal Server Error")
    }
  }

  useEffect(()=>{
   loadData()
  },[])

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
        {formData.doctor && (
          <div className="form-group">
            <label className="form-label">Select Patient:</label>
            <select
              className="full-width patient-dropdown" // Apply additional class for styling
              name="patient"
              value={formData.patient}
              onChange={handleChange}
            >
              <option value="">Select a patient</option>
              {patient.map((patient, index) => (
                <option key={index} value={patient.id}>
                  {console.log(patient)}
                  {patient.name}
                </option>
              ))}
            </select>
          </div>
        )}
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