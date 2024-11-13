import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';

// Import Components
import Login from './components/Login';
import Signup from './components/Signup';
import CarList from './components/CarList';
import CarDetail from './components/CarDetail';
import CreateCar from './components/CreateCar';
import EditCar from './components/EditCar';
import Navbar from './components/Navbar';
import './App.css'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Save token to localStorage and state on login
  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  // Axios interceptor to add token to every request
  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }, [token]);

  return (
    <Router>
      <Navbar token={token} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/login"
          element={!token ? <Login setToken={handleLogin} /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/signup"
          element={!token ? <Signup /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={token ? <CarList /> : <Navigate to="/login" />}
        />
        <Route
          path="/car/:id"
          element={token ? <CarDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-car"
          element={token ? <CreateCar /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit-car/:id"
          element={token ? <EditCar /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
