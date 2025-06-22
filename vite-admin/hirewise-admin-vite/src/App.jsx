import { Routes, Route, Navigate } from 'react-router-dom';
import RegistrationPage from './components/Components/RegistrationPage';
import AdminApp from './components/AdminLayout';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/register" element={<RegistrationPage />} />

      {/* Parent route with nested child routes inside AdminApp layout */}
      <Route path="/admin/*" element={<AdminApp />} />
    </Routes>
  );
}

export default App;
