const fs = require('fs');
const path = require('path');
/*
// Check if the .env file exists
const envFilePath = path.join(__dirname, '.env');
if (!fs.existsSync(envFilePath)) {
  console.error('Missing .env file! Please create a .env file with your environment variables.');
  process.exit(1);
}
else {
  console.log('Found .env file');
}

console.log(process.env.MONGODB_URI)

// Check if the .env file contains a MongoDB URI
if (!process.env.MONGODB_URI) {
  console.error('Missing MongoDB URI in .env file! Please provide a MongoDB URI in the .env file.');
  process.exit(1);
}
*/
require('dotenv').config({ path: '.env'});

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8000; // Use PORT environment variable if provided, otherwise default to 8000

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Mount route files
const patientRoutes = require('./routes/patient.routes');
const doctorRoutes = require('./routes/doctor.routes');
const staffRoutes = require('./routes/staff.routes');
const appointmentRoutes = require('./routes/appointment.routes');

// Use routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(patientRoutes);
app.use(doctorRoutes);
app.use(staffRoutes);
app.use(appointmentRoutes);

// Define a simple route for testing
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
