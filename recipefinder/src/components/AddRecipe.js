import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddRecipe() {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/recipes', { name, ingredients, instructions })
      .then(() => navigate('/'))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Add Recipe</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingredients" required />
        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Instructions" required />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}

export default AddRecipe;