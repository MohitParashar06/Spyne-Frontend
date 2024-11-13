import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductList() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const response = await axios.get('http://localhost:5000/api/cars', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCars(response.data);
    };
    fetchCars();
  }, []);

  return (
    <div>
      {cars.map(car => (
        <div key={car._id}>
          <h3>{car.title}</h3>
          <p>{car.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
