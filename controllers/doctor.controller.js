const Doctor = require('../models/doctor.model');

async function createDoctor(req, res) {
  try {
    const { name, email, phone, specialty, password } = req.body;

    // Check if email already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    if (!name || !email || !phone || !specialty) {
        return res.status(400).json({ error: 'Missing required fields in request body' });
      }
      
    const newDoctor = new Doctor({
      name,
      email,
      phone,
      specialty,
      password
    });

    await newDoctor.save();

    res.status(201).json({ message: 'Doctor created successfully' });
  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAllDoctors(req, res) {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getDoctorById(req, res) {
  try {
    const doctorId = req.params.id;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateDoctor(req, res) {
  try {
    const doctorId = req.params.id;
    const updateData = req.body;
    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, updateData, { new: true });
    if (!updatedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json(updatedDoctor);
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteDoctor(req, res) {
  try {
    const doctorId = req.params.id;
    const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);
    if (!deletedDoctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { createDoctor, getAllDoctors, getDoctorById, updateDoctor, deleteDoctor };
