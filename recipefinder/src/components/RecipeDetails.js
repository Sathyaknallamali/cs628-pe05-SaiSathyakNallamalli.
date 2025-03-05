import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/recipes/${id}`)
      .then(response => setRecipe(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/recipes/${id}`)
      .then(() => navigate('/'))
      .catch(error => console.error(error));
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <h1>{recipe.name}</h1>
      <p>{recipe.ingredients}</p>
      <p>{recipe.instructions}</p>
      <button onClick={() => navigate(`/edit/${recipe._id}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default RecipeDetails;