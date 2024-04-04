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
import ChangePassword from './pages/ChangePassword';
import ViewPatientInfo from './pages/ViewPatientInfo';
import ViewDoctor from './pages/ViewDoctor';
import ViewStaff from './pages/ViewStaff';
import LandingPage from './pages/LandingPage';
import CreateUser from './pages/CreateUser';

function App() {

  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/createusers' element={<CreateUser/>}/>
          <Route path="/create-appointment" element={<CreateAppointment />} /> 
          <Route path="/my-appointments" element={<Appointments />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} /> 
          <Route path="/changeemail" element={<ChangeEmail />} />
          <Route path='/view-appointment' element={<ViewAppointment/>}/>
          <Route path='/create-user' element={<Users/>}/>
          <Route path='/view-users' element={<ViewUser/>}/>
          <Route path='/change-password' element={<ChangePassword/>}/>
          <Route path='/view-patient-info' element={<ViewPatientInfo/>}/>
          <Route path='/view-doctor' element={<ViewDoctor/>}/>
          <Route path='/view-staff' element={<ViewStaff/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;