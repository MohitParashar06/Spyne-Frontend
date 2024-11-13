// src/components/CarList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style/CarList.css'

function CarList() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const response = await axios.get(`http://localhost:5000/api/cars/search?keyword=${search}`);
    setCars(response.data);
  };

  return (
    <div className="container">
      <h2>My Cars</h2>
      <input
        type="text"
        placeholder="Search cars..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input-field"
      />
      <button onClick={fetchCars} className="submit-button">Search</button>
      <Link to="/create-car" className="submit-button">Add New Car</Link>
      <ul className="car-list">
        {cars.map((car) => (
          <li key={car._id} className="card car-list-item">
            <Link to={`/car/${car._id}`}>{car.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarList;
