const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');
const authMiddleware = require('./authMiddleware');

// Define routes for patients
router.post('/patients', authMiddleware, patientController.createPatient);
router.get('/patients', authMiddleware, patientController.getAllPatients);
router.get('/patients/:id', authMiddleware, patientController.getPatientById);
router.put('/patients/:id', authMiddleware, patientController.updatePatient);
router.delete('/patients/:id', authMiddleware, patientController.deletePatient);

module.exports = router;