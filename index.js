const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

require('dotenv').config({ path: '.env' });

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5173;

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

// Define a simple route for testing
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.post('/login', (req, res) => {
  const user = { id: 123, username: 'example_user', role: 'admin' };
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({token});
})

app.get('/protected', authenticateUser, (req, res) => {
  const user = req.user;
  if (user.role === 'admin') {
    res.json({ message: 'Admin access granted' });
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
});

const authenticateUser = (req, res, next) =>{
  const token = req.headers.authorization;
  if(!token){
    return res.status(401).json({ message: 'No token provided' });
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error){
    return res.status(403).json({ message: 'Invalid token' });
  }
};


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


