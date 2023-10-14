import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { updateSettings } from '../services/SettingsService';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState('public');
  const [security, setSecurity] = useState('medium');
  const history = useHistory();

  useEffect(() => {
    // Fetch user's current settings and update state
    // You can use the SettingsService to fetch the settings from Firebase
    // and update the state variables accordingly
  }, []);

  const handleSaveSettings = () => {
    // Save the updated settings to Firebase
    // You can use the updateSettings function from the SettingsService
    // to update the settings in Firebase
    updateSettings({ notifications, privacy, security })
      .then(() => {
        // Redirect the user to the home page or any other desired page
        history.push('/');
      })
      .catch((error) => {
        // Handle error if the settings update fails
        console.log('Error updating settings:', error);
      });
  };

  return (
    <div>
      <h1>Settings</h1>
      <div>
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
          Enable notifications
        </label>
      </div>
      <div>
        <label>
          Privacy:
          <select value={privacy} onChange={(e) => setPrivacy(e.target.value)}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Security:
          <select value={security} onChange={(e) => setSecurity(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>
      <button onClick={handleSaveSettings}>Save</button>
    </div>
  );
};

export default Settings;