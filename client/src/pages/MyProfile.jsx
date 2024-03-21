import React, { useState } from 'react';
import './MyProfile.css'; // Import the CSS file for styling

function MyProfile() {
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
          <h3>Rodrigo Soto</h3>
          <p className="contact-info">Phone: +123456789</p>
          <p className="contact-info">Email: example@example.com</p>
          <p className="bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate a metus sit amet ultricies.</p>
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
        </div>
      </div>
      <div className="pdf-visualizer">
        {selectedFile && (
          <embed src={selectedFile} type="application/pdf" width="100%" height="600px" />
        )}
      </div>
    </div>
  );
}

export default MyProfile;
