import React, { useState } from 'react';
import './SettingsPage.css';

function SettingsPage() {
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    sms: false,
    pushNotification: true
  });

  const [timeZone, setTimeZone] = useState('UTC');
  const [timeFormat, setTimeFormat] = useState('12hr');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State variable to control visibility of success message

  const handleNotificationChange = (event) => {
    const { name, checked } = event.target;
    setNotificationPreferences(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleTimeZoneChange = (event) => {
    const selectedTimeZone = event.target.value;
    setTimeZone(selectedTimeZone);
  };

  const handleTimeFormatChange = (event) => {
    const selectedTimeFormat = event.target.value;
    setTimeFormat(selectedTimeFormat);
  };

  const savePreferences = () => {
    console.log('Preferences saved:', notificationPreferences, timeZone, timeFormat);
    setShowSuccessMessage(true); // Show success message
    setTimeout(() => {
      setShowSuccessMessage(false); // Hide success message after 3 seconds
    }, 3000);
  };

  return (
    <div className="settings-container">
      <h2 className="settings-header">Notification Preferences</h2>
      <div className="notification-preferences">
        <label>
          <input
            type="checkbox"
            name="email"
            checked={notificationPreferences.email}
            onChange={handleNotificationChange}
          />
          Receive Email Notifications
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="sms"
            checked={notificationPreferences.sms}
            onChange={handleNotificationChange}
          />
          Receive SMS Notifications
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="pushNotification"
            checked={notificationPreferences.pushNotification}
            onChange={handleNotificationChange}
          />
          Receive Push Notifications
        </label>
        
      </div>
      <div className="time-zone">
        <h3>Time Zone</h3>
        <select value={timeZone} onChange={handleTimeZoneChange}>
          {/* Populate options with available time zones */}
          <option value="UTC">UTC</option>
          <option value="America/New_York">Eastern Time (ET)</option>
          <option value="America/Chicago">Central Time (CT)</option>
          <option value="America/Denver">Mountain Time (MT)</option>
          <option value="America/Los_Angeles">Pacific Time (PT)</option>
          {/* Add more time zones as needed */}
        </select>
      </div>
      <div className="time-format">
        <h3>Time Format</h3>
        <label>
          <input
            type="radio"
            value="12hr"
            checked={timeFormat === '12hr'}
            onChange={handleTimeFormatChange}
          />
          12-hour
        </label>
        <label>
          <input
            type="radio"
            value="24hr"
            checked={timeFormat === '24hr'}
            onChange={handleTimeFormatChange}
          />
          24-hour
        </label>
      </div>

      <button className="save-btn" onClick={savePreferences}>Save Preferences</button>
      {showSuccessMessage && (
        <div className="success-message">Preferences saved successfully!</div>
      )}
    </div>
  );
}

export default SettingsPage;
