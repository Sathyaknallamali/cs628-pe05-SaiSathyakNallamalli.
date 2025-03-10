const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://saisathyak06ssk:Sathyak@cs628sisathyak.k2g2j.mongodb.net/?retryWrites=true&w=majority&appName=CS628sisathyak";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const db = client.db("recipeDB");
    const recipesCollection = db.collection("recipes");

    app.get('/recipes', async (req, res) => {
      try {
        const recipes = await recipesCollection.find().toArray();
        res.json(recipes);
      } catch (error) {
        res.status(500).json({ error: 'Unable to fetch recipes' });
      }
    });

    app.post('/recipes', async (req, res) => {
      try {
        const newRecipe = req.body;
        const result = await recipesCollection.insertOne(newRecipe);
        res.json(result.ops[0]);
      } catch (error) {
        res.status(500).json({ error: 'Unable to save the recipe' });
      }
    });

    app.put('/recipes/:id', async (req, res) => {
      try {
        const updatedRecipe = req.body;
        const result = await recipesCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: updatedRecipe }
        );
        if (result.matchedCount === 0) {
          return res.status(404).json({ error: 'Recipe not found' });
        }
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: 'Unable to update the recipe' });
      }
    });

    app.delete('/recipes/:id', async (req, res) => {
      try {
        const result = await recipesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Recipe not found' });
        }
        res.json({ message: 'Recipe deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Unable to delete the recipe' });
      }
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

run().catch(console.dir);
