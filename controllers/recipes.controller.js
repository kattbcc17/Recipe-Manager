import MongoDB from "../db/mongo.js";
import { ObjectId } from "mongodb";

// Get all recipes
export const getAll = async (_, res) => {
    const _db = MongoDB.getDb();
    const recipes = await _db.collection('recipeManager').find().toArray();
    res.send({
        statusCode: 200,
        data: {
            recipes: recipes
        },
        message: "Recipes fetched successfully"
    });
};

// Get a single recipe by ID
export const getSingle = async (req, res) => {
    const recipeID = new ObjectId(req.params.id);
    const _db = MongoDB.getDb();
    const result = await _db.collection('recipeManager').findOne({ _id: recipeID });

    if (!result) {
        return res.status(404).json({ message: 'Recipe not found.' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

// Create a new recipe
export const createRecipe = async (req, res) => {
    const recipe = {
        title: req.body.title,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        category: req.body.category,
        author: req.body.author,
        dateAdded: req.body.dateAdded,
        rating: req.body.rating
    };
  
    try {
        const _db = MongoDB.getDb();
        const response = await _db.collection('recipeManager').insertOne(recipe);
        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json({ error: 'Error creating recipe' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a recipe
export const updateRecipe = async (req, res) => {
    const recipeId = new ObjectId(req.params.id);
    const updatedRecipe = {
        title: req.body.title,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        category: req.body.category,
        author: req.body.author,
        dateAdded: req.body.dateAdded,
        rating: req.body.rating
    };
  
    try {
        const _db = MongoDB.getDb();
        const response = await _db.collection('recipeManager').replaceOne({ _id: recipeId }, updatedRecipe);
        if (response.modifiedCount > 0) {
            res.status(200).send('Recipe updated successfully');
        } else {
            res.status(404).send('Recipe not found');
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a recipe
export const deleteRecipe = async (req, res) => {
    const recipeId = new ObjectId(req.params.id);
  
    try {
        const _db = MongoDB.getDb();
        const response = await _db.collection('recipeManager').deleteOne({ _id: recipeId });
        if (response.deletedCount > 0) {
            res.status(200).send('Recipe deleted successfully');
        } else {
            res.status(404).send('Recipe not found');
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
