import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import RegistrationPage from './components/Components/RegistrationPage';
import AdminApp from './components/AdminLayout';
import CombinedMultiStepForm from './components/Components/MultiStepForm/CombinedMultiStepForm';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
<<<<<<< Updated upstream
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then(response => response.json())
      .then(data => {
        console.log("Fetched from backend:", data);
        setBackendData(data);
      })
      .catch(err => {
        console.error("API fetch error:", err);
      });
  }, []);

  return (
    <>
      {/* <div>
        {!backendData || !backendData.users ? (
          <p>Loading...</p>
        ) : (
          backendData.users.map((user, i) => (
            <p key={i}>{user}</p>
          ))
        )}
      </div> */}

      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </>
=======
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/application" element={<CombinedMultiStepForm />} />
      {/* Parent route with nested child routes inside AdminApp layout */}
      <Route path="/admin/*" element={<AdminApp />} />
    </Routes>
>>>>>>> Stashed changes
  );
}

export default App;
