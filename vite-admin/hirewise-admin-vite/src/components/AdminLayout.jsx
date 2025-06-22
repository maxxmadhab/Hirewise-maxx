import { useState } from 'react';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import { Home, Users, Bell, Settings, Menu, X } from 'lucide-react';
import Dashboard from './Dashboard';
import AllCandidates from './AllCandidates';
import Notification from './Notification';
import SettingsPage from './Settings'; // rename to avoid conflict

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Home, path: '/admin/dashboard' },
    { id: 'allcandidates', name: 'All Candidates', icon: Users, path: '/admin/candidates' },
    { id: 'notification', name: 'Notifications', icon: Bell, path: '/admin/notifications' },
    { id: 'settings', name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 bg-blue-600">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white hover:text-gray-200">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-6">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center px-6 py-3 text-left transition-colors text-gray-700 hover:bg-gray-50"
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">A</span>
              </div>
              <span className="text-gray-700 font-medium">Administrator</span>
            </div>
          </div>
        </header>

        {/* Nested routes render here */}
        <main className="flex-1 p-6 min-h-0 overflow-hidden">
          <div className="h-full overflow-auto">
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="candidates" element={<AllCandidates />} />
              <Route path="notifications" element={<Notification />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;