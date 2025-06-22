import React, { useState } from 'react';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: 'Administrator',
    email: 'admin@example.com',
    password: ''
  });

  const [systemSettings, setSystemSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    autoBackup: true,
    darkMode: false
  });

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSystemSettingToggle = (setting) => {
    setSystemSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleUpdateProfile = () => {
    // Add your profile update logic here
    console.log('Updating profile:', profile);
  };

  const handleResetData = () => {
    // Add confirmation dialog and reset logic here
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      console.log('Resetting all data...');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Admin Name</label>
              <input 
                type="text" 
                value={profile.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                value={profile.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Change Password</label>
              <input 
                type="password" 
                value={profile.password}
                onChange={(e) => handleProfileChange('password', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
              />
            </div>
            <button 
              onClick={handleUpdateProfile}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
            >
              Update Profile
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">System Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Email Notifications</span>
              <input 
                type="checkbox" 
                className="h-4 w-4 text-blue-600" 
                checked={systemSettings.emailNotifications}
                onChange={() => handleSystemSettingToggle('emailNotifications')}
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">SMS Notifications</span>
              <input 
                type="checkbox" 
                className="h-4 w-4 text-blue-600" 
                checked={systemSettings.smsNotifications}
                onChange={() => handleSystemSettingToggle('smsNotifications')}
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Auto-backup</span>
              <input 
                type="checkbox" 
                className="h-4 w-4 text-blue-600" 
                checked={systemSettings.autoBackup}
                onChange={() => handleSystemSettingToggle('autoBackup')}
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Dark Mode</span>
              <input 
                type="checkbox" 
                className="h-4 w-4 text-blue-600" 
                checked={systemSettings.darkMode}
                onChange={() => handleSystemSettingToggle('darkMode')}
              />
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Danger Zone</h3>
            <button 
              onClick={handleResetData}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors"
            >
              Reset All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;