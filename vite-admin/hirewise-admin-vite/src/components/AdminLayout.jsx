import { useState, useEffect } from 'react';
import { Routes, Route, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Users, Bell, Settings, Menu, X } from 'lucide-react';
import Dashboard from './Dashboard';
import AllCandidates from './AllCandidates';
import Notification from './Notification';
import SettingsPage from './Settings';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Home, path: '/admin/dashboard' },
    { id: 'allcandidates', name: 'All Candidates', icon: Users, path: '/admin/candidates' },
    { id: 'notification', name: 'Notifications', icon: Bell, path: '/admin/notifications' },
    { id: 'settings', name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const activeNav = navigation.find(item => currentPath.startsWith(item.path));
    setActiveItem(activeNav?.id || 'dashboard');
  }, [location]);

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 shadow-xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 bg-gray-800 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="lg:hidden text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-6 px-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-4 py-3 text-left transition-all duration-200 rounded-md mx-1 mb-1
                  ${isActive 
                    ? 'bg-gray-700 text-white shadow-inner' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                `}
              >
                <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-white animate-pulse"></span>
                )}
              </button>
            );
          })}
        </nav>
        
        {/* Sidebar footer */}
        <div className="absolute bottom-0 w-full px-4 py-3 bg-gray-800 border-t border-gray-700">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center mr-2 border border-gray-600">
              <span className="text-white font-medium text-sm">A</span>
            </div>
            <div>
              <p className="font-medium text-white">Administrator</p>
              <p className="text-gray-400 text-xs">Super Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            {/* Search bar */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-1/3 max-w-md transition-all duration-200 focus-within:bg-white focus-within:ring-1 focus-within:ring-gray-300">
              <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none focus:outline-none w-full text-gray-700 placeholder-gray-500"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors duration-200" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">3</span>
              </div>
              <div className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
                <span className="text-white font-medium text-sm">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center text-sm text-gray-600">
          <span className="text-gray-900 font-medium">Admin</span>
          <svg className="h-4 w-4 mx-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-800 capitalize">{activeItem.replace(/([A-Z])/g, ' $1').trim()}</span>
        </div>

        {/* Nested routes render here */}
        <main className="flex-1 p-6 min-h-0 overflow-hidden bg-gray-50">
          <div className="h-full overflow-auto rounded-lg bg-white shadow-xs border border-gray-200 p-6">
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