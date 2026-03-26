import { Router } from "express";
import { getAllRecipes, getRecipeById, createNewRecipe, updateRecipe, deleteRecipe } from "../controllers/RecipesControllers.js";

const RecipesRouter = Router();


RecipesRouter.get('/recipes', getAllRecipes)

RecipesRouter.get('/recipes/:id', getRecipeById)

RecipesRouter.post('/recipe', createNewRecipe)

RecipesRouter.put('/recipes/edit/:id', updateRecipe)

RecipesRouter.delete('/recipes/:id', deleteRecipe)

export default RecipesRouter;