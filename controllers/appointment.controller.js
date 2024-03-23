const { get } = require("mongoose");
const Appointment = require("../models/appointment.model");
const Doctor = require("../models/doctor.model");
const Patient = require("../models/patient.model");

async function createAppointment(req, res) {
  try {
    const { patient, doctor, dateTime, reason, notes } = req.body;

    // Check if there's any existing appointment for the same doctor at the same time
    const existingAppointment = await Appointment.findOne({ doctor, dateTime });
    if (existingAppointment) {
      return res.status(400).json({
        error:
          "Appointment time overlaps with an existing appointment for the same doctor",
      });
    }

    const { doctorName, patientName } = await getDoctorAndPatientName(
      doctor,
      patient
    );

    const newAppointment = new Appointment({
      patient,
      doctor,
      dateTime,
      reason,
      notes,
      patientName,
      doctorName,
    });

    await newAppointment.save();

    res.status(201).json({ message: "Appointment created successfully" });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getDoctorAndPatientName(doctorId, patientId) {
  try {
    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);
    console.log(doctorId);

    if (!doctor) {
      throw new Error("Doctor not found");
    } else if (!patient) {
      throw new Error("Patient not found");
    }

    return { doctorName: doctor.name, patientName: patient.name };
  } catch (error) {
    console.error("Error fetching doctor and patient name:", error);
    throw error;
  }
}

async function getAllAppointments(req, res) {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getAppointmentById(req, res) {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.status(200).json(appointment);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateAppointment(req, res) {
  try {
    const appointmentId = req.params.id;
    const updateData = req.body;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      updateData,
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteAppointment(req, res) {
  try {
    const appointmentId = req.params.id;
    const deletedAppointment = await Appointment.findByIdAndDelete(
      appointmentId
    );
    if (!deletedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};
