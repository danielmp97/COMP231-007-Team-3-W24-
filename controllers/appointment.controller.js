const { get } = require("mongoose");const Appointment = require('../models/appointment.model');
const Doctor = require('../models/doctor.model');
const Patient = require('../models/patient.model');


const AppointmentModel  = require('../models/appointment.model'); // Import the Appointment model

async function createAppointment(req, res) {
  try {
    // Extract appointment details from the request body
    const { appointmentDate, appointmentTime, reason } = req.body;
    console.log(appointmentDate)

    // Check if date, time, and reason are provided
    if (!appointmentDate || !appointmentTime || !reason) {
      return res.status(400).json({ message: 'Date, time, and reason are required.' });
    }

    // Placeholder appointment details with doctor name as "Juan" and patient name as "John"
    const newAppointment = new AppointmentModel ({
      doctor: '660e35371a561694a569f7a4',
      patient: '660e54dc1a561694a569f7b6',
      dateTime: new Date(`${appointmentDate}T${appointmentTime}`),
      reason,
    });

    // Create appointment
    // const appointment = new Appointment(appointmentDetails);
    await newAppointment.save();

    console.log('Appointment created successfully:', newAppointment);

    // Respond with success message
    res.status(201).json({ message: 'Appointment created successfully', newAppointment });
  } catch (error) {
    console.error('Error creating appointment:', error);
    // Respond with error message
    res.status(500).json({ message: 'Error creating appointment', error: error.message });
  }
}


async function getDoctorAndPatientName(doctorId, patientId) {
  try {
    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);
    
    if (!doctor) {
      throw new Error('Doctor not found');
    } else if (!patient) {
      throw new Error('Patient not found');
    }
    
    return { doctorName: doctor.name, patientName: patient.name };
  } catch (error) {
    console.error('Error fetching doctor and patient name:', error);
    throw error; 
  }
}

async function getAllAppointments(req, res) {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAppointmentById(req, res) {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateAppointment(req, res) {
  try {
    // const { role } = req.user; // Assuming role is passed through authentication middleware
    // const appointmentId = req.params.id;
    // console.log(req.body)
    // const updateData = req.body;
    const appointmentId = req.params.id;
    const { status } = req.body;

    const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId, { status }, { new: true });
    
    // if (role !== 'frontDesk' && role !== 'IT' && updateData.canceled) {
    //   return res.status(403).json({ error: 'Unauthorized to cancel appointment' });
    // }
    // console.log(updateData)
    // const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId, updateData, { new: true });
    if (!updatedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// En tu controlador de citas (appointment.controller.js)

async function deleteAppointment(req, res) {
  try {
    const appointmentId = req.params.id;
    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);
    console.log(appointmentId)
    if (!deletedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { deleteAppointment };



module.exports = { createAppointment, getAllAppointments, getAppointmentById, updateAppointment, deleteAppointment };