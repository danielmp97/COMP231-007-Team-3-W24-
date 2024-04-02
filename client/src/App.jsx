import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import NavigationBar from './pages/NavigationBar';
import Homepage from './pages/Homepage';
import CreateAppointment from './pages/createAppointment'; 
import Appointments from './pages/Appointments';
import MyProfile from './pages/MyProfile';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ChangeEmail from './pages/ChangeEmail';
import ViewAppointment from './pages/ViewAppointment';
import Users from './pages/CreateUser';
import ViewUser from './pages/Users';
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
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> 
          <Route path="/change-email" element={<ChangeEmail />} />
          <Route path='/view-appointment' element={<ViewAppointment/>}/>
          <Route path='/create-user' element={<Users/>}/>
          <Route path='/view-users' element={<ViewUser/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;