const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff.controller');

// Define routes for staff members
router.post('/staff', staffController.createStaff);
router.get('/staff', staffController.getAllStaff);
router.get('/staff/:id', staffController.getStaffById);
router.put('/staff/:id', staffController.updateStaff);
router.delete('/staff/:id', staffController.deleteStaff);
// router.post('/users', userController.createUser)

module.exports = router;
