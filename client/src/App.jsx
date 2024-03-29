import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import CreateAppointment from './pages/CreateAppointment';
import Appointments from './pages/Appointments';
import MyProfile from './pages/MyProfile';
import Login from './pages/Login';
import UserCreation from './pages/UserCreation';
import NavigationBar from './pages/NavigationBar';
import Patient from './pages/Patient';
import Doctor from './pages/Doctor'; 
import Staff from './pages/Staff'; 



function App() {
  const userRole = 'patient';
  return (
    <Router>
      <div>
        <NavigationBar />

        <Routes>

          <Route path="/" element={<Homepage />} />
          <Route path="/create-appointment" element={<CreateAppointment />} /> 
          <Route path="/my-appointments" element={<Appointments />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-user" element={<UserCreation />} />

          {/* <Route path="/patients" element={<Patient />} /> */}
          <ProtectedRoute path="/patient" element={<Patient />} allowedRoles={['patient']} userRole={userRole} />
          <ProtectedRoute path="/doctor" element={<Doctor />} allowedRoles={['doctor']} userRole={userRole} />
          <ProtectedRoute path="/staff" element={<Staff />} allowedRoles={['staff']} userRole={userRole} />

          {/* <Route path="/doctors" element={<Doctor />} /> 
          <Route path="/staff" element  ={<Staff />} /> */}
        

        </Routes>
      </div>
    </Router>
  );
}

export default App;
