import { Router } from "express";
import { getAllRecipes, getRecipeById, createNewRecipe } from "../controllers/RecipesControllers.js";

const RecipesRouter = Router();


RecipesRouter.get('/recipes', getAllRecipes)

RecipesRouter.get('/recipes/:id', getRecipeById)

RecipesRouter.post('/recipe', createNewRecipe)

export default RecipesRouter;