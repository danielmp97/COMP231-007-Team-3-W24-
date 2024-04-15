const fs = require('fs');
const path = require('path');
const cors = require('cors');

require('dotenv').config({ path: '.env'});

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Mount route files
const patientRoutes = require('./routes/patient.routes');
const doctorRoutes = require('./routes/doctor.routes');
const staffRoutes = require('./routes/staff.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const authRoutes = require('./routes/auth.routes');

// Use routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(patientRoutes);
app.use(doctorRoutes);
app.use(staffRoutes);
app.use(appointmentRoutes);
app.use(authRoutes);

//Use the client app
app.use(express.static(path.join(__dirname, '/client/dist')))

//render client for any path 
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/client/dist/index.html')))

// Define a simple route for testing
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start the server
app.listen(() => {
  console.log(`Server is running at https://medlink-m2u5.onrender.com`);
});
