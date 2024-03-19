const Appointment = require('../models/appointment.model');

async function createAppointment(req, res) {
    try {
      const { patient, doctor, dateTime, reason, notes } = req.body; // Use correct field names
      
      console.log('patient:', patient);
      console.log('doctor:', doctor);
      console.log('dateTime:', dateTime);
      console.log('reason:', reason);
      console.log('notes:', notes);
      
      const newAppointment = new Appointment({
        patient,
        doctor,
        dateTime,
        reason,
        notes
      });
  
      await newAppointment.save();
  
      res.status(201).json({ message: 'Appointment created successfully' });
    } catch (error) {
      console.error('Error creating appointment:', error);
      res.status(500).json({ error: 'Internal server error' });
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
    const appointmentId = req.params.id;
    const updateData = req.body;
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
    const appointmentId = req.params.id;
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
