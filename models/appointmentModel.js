const mongoose = require('mongoose');
const Doctor = require('./doctor.model');
const Patient = require('./patient.model');

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
    notes: String,
    patientName: {
        type: String,
    },
    doctorName: {
        type: String,
    }
});

// Middleware to prevent scheduling appointments at the same time for the same doctor
appointmentSchema.pre('save', async function (next) {
    try {
        const existingAppointment = await this.constructor.findOne({
            doctor: this.doctor,
            dateTime: this.dateTime
        });

        if (existingAppointment) {
            throw new Error('Another appointment already exists for the same doctor at this time.');
        }

        next();
    } catch (error) {
        next(error);
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
