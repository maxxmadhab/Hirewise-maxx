import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RegistrationPage from './components/Components/RegistrationPage';
import AdminApp from './components/AdminLayout';
import CombinedMultiStepForm from './components/Components/MultiStepForm/CombinedMultiStepForm';
import './App.css';

const BASE_URL = "https://hirewise-maxx-2.onrender.com"; // your backend on Render

function App() {
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    fetch(BASE_URL + "/api")
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
      {/* Optional: Render backend data if needed */}
      {/* 
      <div>
        {!backendData || !backendData.users ? (
          <p>Loading...</p>
        ) : (
          backendData.users.map((user, i) => (
            <p key={i}>{user}</p>
          ))
        )}
      </div> 
      */}

      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/application" element={<CombinedMultiStepForm />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </>
  );
}

export default App;
