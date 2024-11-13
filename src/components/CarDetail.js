// src/components/CarDetail.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './style/CarDetail.css'

function CarDetail() {
  const [car, setCar] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCar();
  }, []);

  const fetchCar = async () => {
    const response = await axios.get(`http://localhost:5000/api/cars/${id}`);
    setCar(response.data);
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/api/cars/${id}`);
    navigate('/dashboard');
  };

  if (!car) return <p>Loading...</p>;

  return (
    <div className="card car-detail">
      <h2>{car.title}</h2>
      <p>{car.description}</p>
      <p>Tags: {car.tags.join(', ')}</p>
      <div className="card-actions">
        <Link to={`/edit-car/${id}`} className="submit-button">Edit</Link>
        <button onClick={handleDelete} className="submit-button">Delete</button>
      </div>
    </div>
  );
}

export default CarDetail;
