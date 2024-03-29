const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctor.model'); 
const Patient = require('../models/patient.model'); 
const Staff = require('../models/staff.model'); 
const { generateAuthToken } = require('../utility'); 

async function login(req, res) {
  console.log("you are here...");
  const { email, password, role } = req.body;

  try {
    let user;
    switch (role) {
      case 'doctor':
        user = await Doctor.findOne({ email });
        break;
      case 'patient':
        user = await Patient.findOne({ email });
        break;
      case 'IT staff':
        user = await Staff.findOne({ email });
        break;
      default:
        return res.status(400).json({ message: 'Invalid role' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateAuthToken(user);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { login };
