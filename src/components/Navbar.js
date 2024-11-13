// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './style/Navbar.css'

function Navbar({ token, handleLogout }) {
  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      {token ? (
        <>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
