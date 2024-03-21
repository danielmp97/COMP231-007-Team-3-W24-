import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import NavigationBar from './pages/NavigationBar';
import Homepage from './pages/Homepage';
import CreateAppointment from './pages/createAppointment'; 
import Appointments from './pages/Appointments';
import MyProfile from './pages/MyProfile';

function App() {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create-appointment" element={<CreateAppointment />} /> 
          <Route path="/my-appointments" element={<Appointments />} />
          <Route path="/my-profile" element={<MyProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


