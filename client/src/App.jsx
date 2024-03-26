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
import Users from './pages/CreateUsers';
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
          <Route path="/forgotpassword" element={<ForgotPassword />} /> 
          <Route path="/changeemail" element={<ChangeEmail />} />
          <Route path='/createUsers' element={<Users/>}/>
          <Route path="/users" element={<ViewUser/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
