const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('your_mongodb_atlas_connection_string', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: String,
  instructions: String,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

app.get('/recipes', async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

app.post('/recipes', async (req, res) => {
  const newRecipe = new Recipe(req.body);
  await newRecipe.save();
  res.json(newRecipe);
});

app.put('/recipes/:id', async (req, res) => {
  const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedRecipe);
});

app.delete('/recipes/:id', async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ message: 'Recipe deleted' });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});