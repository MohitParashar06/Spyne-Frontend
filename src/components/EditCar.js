// src/components/EditCar.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditCar() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCar();
  }, []);

  const fetchCar = async () => {
    const response = await axios.get(`http://localhost:5000/api/cars/${id}`);
    const { title, description, tags, images } = response.data;
    setTitle(title);
    setDescription(description);
    setTags(tags.join(', '));
    setImages(images);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const tagsArray = tags.split(',').map((tag) => tag.trim());
    await axios.put(`http://localhost:5000/api/cars/${id}`, { title, description, tags: tagsArray, images });
    navigate('/dashboard');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleUpdate} className="container">
        <h2>Edit Car</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="submit-button">Update</button>
      </form>
    </div>
  );
}

export default EditCar;
