import React, { useState } from 'react';

const Notification = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [recipients, setRecipients] = useState('all');

  const handleSendNotification = () => {
    // Add your notification sending logic here
    console.log('Sending notification:', { title, message, recipients });
    // Reset form
    setTitle('');
    setMessage('');
    setRecipients('all');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Notifications</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Send New Notification</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter notification title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter notification message"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
              <select 
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Candidates</option>
                <option value="active">Active Candidates</option>
                <option value="pending">Pending Candidates</option>
                <option value="inactive">Inactive Candidates</option>
              </select>
            </div>
            <button 
              onClick={handleSendNotification}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
            >
              Send Notification
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Notifications</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-gray-800">Welcome Message</h3>
              <p className="text-sm text-gray-600 mt-1">Sent to all new candidates</p>
              <p className="text-xs text-gray-500 mt-2">2 hours ago</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h3 className="font-semibold text-gray-800">Application Update</h3>
              <p className="text-sm text-gray-600 mt-1">Status update notification sent</p>
              <p className="text-xs text-gray-500 mt-2">1 day ago</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-semibold text-gray-800">System Maintenance</h3>
              <p className="text-sm text-gray-600 mt-1">Scheduled maintenance alert</p>
              <p className="text-xs text-gray-500 mt-2">3 days ago</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-semibold text-gray-800">New Feature Announcement</h3>
              <p className="text-sm text-gray-600 mt-1">Introduced candidate filtering</p>
              <p className="text-xs text-gray-500 mt-2">1 week ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;