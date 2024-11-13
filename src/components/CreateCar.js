// src/components/CreateCar.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateCar() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    const tagsArray = tags.split(',').map((tag) => tag.trim());
    await axios.post('http://localhost:5000/api/cars', { title, description, tags: tagsArray, images });
    navigate('/dashboard');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleCreate} className="container">
        <h2>Create New Car</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="submit-button">Create</button>
      </form>
    </div>
  );
}

export default CreateCar;
