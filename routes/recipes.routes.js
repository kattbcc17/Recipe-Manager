import express from 'express'
import { getAll, getSingle, createRecipe, updateRecipe, deleteRecipe } from '../controllers/recipes.controller.js';

const router = express.Router();

// Get all recipes
router.get('/', getAll);

// Get a single recipe by ID
router.get('/:id', getSingle);

// Create a new recipe
router.post('/', createRecipe);

// Update a recipe
router.put('/:id', updateRecipe);

// Delete a recipe
router.delete('/:id', deleteRecipe);

export default router;