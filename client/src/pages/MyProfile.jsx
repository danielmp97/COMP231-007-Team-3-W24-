import React, { useState, useEffect } from 'react';
import './MyProfile.css'; 
import { jwtDecode } from "jwt-decode";

function MyProfile() {
  const [userInfo, setUserInfo] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const URL = 'http://localhost:8000/';
  const [doctorFlag, setDoctorFlag] = useState(false);
  const [patientFlag, setPatientFlag] = useState(false);
  const [staffFlag, setStaffFlag] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = getToken();
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        const role = decodedToken.role;
        setUserRole(role);
        
        let response;
        if (role === 'doctor') {
          response = await fetch(URL + `doctors/${userId}`);
          setDoctorFlag(true);
        } else if (role === 'patient') {
          response = await fetch(URL + `patients/${userId}`);
          setPatientFlag(true);
        } else if (role === 'IT staff' || role === 'front desk') {
          response = await fetch(URL + `staff/${userId}`);
          setStaffFlag(true);
        }
        
        if (response && response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          throw new Error('Failed to fetch user information');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const getToken = () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
    return token;
  };

  const redirectToChangeEmail = () => {
    window.location.href = '/change-email';
  }

  const redirectToChangePassword = () => {
    window.location.href = '/change-password';
  }

  // Dummy PDF file paths for demonstration
  const medicalHistoryFiles = [
    {
      name: 'Medical Report 1',
      fileUrl: '/medical_reports/report1.pdf'
    },
    {
      name: 'Medical Report 2',
      fileUrl: '/medical_reports/report2.pdf'
    }
  ];

  // State to manage selected PDF file
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileSelect = (fileUrl) => {
    setSelectedFile(fileUrl);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>My Profile</h2>
      </div>
      <div className="profile-content">
        <div className="profile-picture">
          <img src="your_profile_picture.jpg" alt="Your Profile" />
        </div>
        <div className="profile-details">
          {userInfo && doctorFlag && (
            <>
              <h3>{userInfo.name}</h3>
              <p className="contact-info">Phone: {userInfo.phone}</p>
              <p className="contact-info">Email: {userInfo.email}</p>
              {userRole === 'doctor' && (
                <p className="contact-info">Specialty: {userInfo.specialty}</p>
              )}
            </>
          )}
          {userInfo && patientFlag && (
            <>
              <h3>{userInfo.name}</h3>
              <p className="contact-info">Phone: {userInfo.phone}</p>
              <p className="contact-info">Email: {userInfo.email}</p>
              <p className="contact-info">Age: {userInfo.age}</p>
              <p className="contact-info">Gender: {userInfo.gender === 'male' ? 'Male' : 'Female'}</p>
            </>
          )}
          {userInfo && staffFlag && (
            <>
              <h3>{userInfo.name}</h3>
              <p className="contact-info">Role: {userInfo.role}</p>
              <p className="contact-info">Email: {userInfo.email}</p>
            </>
          )}
          {patientFlag && (
            <div className="medical-history-container">
              <h3>Medical History</h3>
              <ul className="medical-history">
                {medicalHistoryFiles.map((file, index) => (
                  <li key={index}>
                    <button onClick={() => handleFileSelect(file.fileUrl)}>{file.name}</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="pdf-visualizer">
        {selectedFile && (
          <embed src={selectedFile} type="application/pdf" width="100%" height="600px" />
        )}
      </div>
      <div className="buttons">
        <button className='change-email-button' onClick={redirectToChangeEmail}>Change Email</button>
        <button className='change-password-button' onClick={redirectToChangePassword}>Change Password</button>
      </div>
    </div>
  );
}

export default MyProfile;
