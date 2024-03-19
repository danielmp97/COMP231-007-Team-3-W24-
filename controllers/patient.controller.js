const Patient = require('../models/patient.model');

async function createPatient(req, res) {
  try {
    const { name, email, phone, gender, age, notes, password } = req.body;

    // Check if email already exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const newPatient = new Patient({
      name,
      email,
      phone,
      gender,
      age,
      notes,
      password
    });

    await newPatient.save();

    res.status(201).json({ message: 'Patient created successfully' });
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAllPatients(req, res) {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getPatientById(req, res) {
  try {
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updatePatient(req, res) {
  try {
    const patientId = req.params.id;
    const updateData = req.body;
    const updatedPatient = await Patient.findByIdAndUpdate(patientId, updateData, { new: true });
    if (!updatedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.status(200).json(updatedPatient);
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deletePatient(req, res) {
  try {
    const patientId = req.params.id;
    const deletedPatient = await Patient.findByIdAndDelete(patientId);
    if (!deletedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { createPatient, getAllPatients, getPatientById, updatePatient, deletePatient };
