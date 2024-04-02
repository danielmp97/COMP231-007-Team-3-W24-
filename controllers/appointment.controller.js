const { get } = require("mongoose");const Appointment = require('../models/appointment.model');
const Doctor = require('../models/doctor.model');
const Patient = require('../models/patient.model');

async function createAppointment(req, res) {
  try {
    const { patient, doctor, dateTime, reason, notes } = req.body;
    
    const { doctorName, patientName } = await getDoctorAndPatientName(doctor, patient);
    
    const newAppointment = new Appointment({
      patient,
      doctor,
      dateTime,
      reason,
      notes,
      patientName,
      doctorName
    });

    await newAppointment.save();

    res.status(201).json({ message: 'Appointment created successfully' });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
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
    const { role } = req.user; // Assuming role is passed through authentication middleware
    const appointmentId = req.params.id;
    console.log(req.body)
    const updateData = req.body;

    
    if (role !== 'frontDesk' && role !== 'IT' && updateData.canceled) {
      return res.status(403).json({ error: 'Unauthorized to cancel appointment' });
    }
    console.log(updateData)
    const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId, updateData, { new: true });
    if (!updatedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteAppointment(req, res) {
  try {
    const { role } = req.user; // Assuming role is passed through authentication middleware
    const appointmentId = req.params.id;
    
    if (role !== 'frontDesk' && role !== 'IT') {
      return res.status(403).json({ error: 'Unauthorized to delete appointment' });
    }
    
    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);
    if (!deletedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { createAppointment, getAllAppointments, getAppointmentById, updateAppointment, deleteAppointment };