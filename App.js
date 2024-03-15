import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/nav.jsx';
import Home from './components/home.jsx';
import Patient from './components/patient.jsx';
import Doctor from './components/doctor.jsx';



function App() {
  return (
    <Router>
        <Navigation/>

          <Routes>
            <Route path='/' Component={Home}/>
            <Route path='/patient' Component={Patient}/>
            <Route path='/doctor' Component={Doctor}/>
          </Routes>   

    </Router>
  );
}

export default App;
