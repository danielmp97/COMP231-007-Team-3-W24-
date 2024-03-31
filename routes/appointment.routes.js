const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');
const { User } = require('../middleware/authMiddleware');

// Define routes for appointments
router.post('/appointments', appointmentController.createAppointment);
router.get('/appointments', appointmentController.getAllAppointments);
router.get('/appointments/:id', appointmentController.getAppointmentById);
router.put('/appointments/:id',User ,appointmentController.updateAppointment);
router.delete('/appointments/:id', appointmentController.deleteAppointment);

module.exports = router;