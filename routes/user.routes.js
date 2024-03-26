const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller')

router.post('/createUser',controller.createUser)

router.get('/getAllUsers',controller.getAllUsers)


module.exports = router