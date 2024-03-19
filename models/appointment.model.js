const mongoose = require('mongoose');
const Doctor = require('./doctor.model'); // Import Doctor model
const Patient = require('./patient.model'); // Import Patient model

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  notes: String
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
