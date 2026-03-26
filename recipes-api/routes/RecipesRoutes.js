import { Router } from "express";
import {
  getAllRecipes,
  getRecipeById,
  createNewRecipe,
  updateRecipeByID,
} from "../controllers/RecipesControllers.js";
import { checkIfUserExist } from "../middlewares/checkIfUserExist.js";
import { checkIfRecipeExist } from "../middlewares/checkIfRecipeExist.js";

const RecipesRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: Recipe management
 */

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Retrieve a list of all recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: A list of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   ingredients:
 *                     type: string
 *                   img:
 *                     type: string
 *                   category:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
RecipesRouter.get("/recipes", getAllRecipes);

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     summary: Retrieve a single recipe by ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The recipe ID
 *     responses:
 *       200:
 *         description: A single recipe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 ingredients:
 *                   type: string
 *                 img:
 *                   type: string
 *                 category:
 *                   type: string
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Internal server error
 */
RecipesRouter.get("/recipes/:id", getRecipeById);

/**
 * @swagger
 * /recipe:
 *   post:
 *     summary: Create a new recipe
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - ingredients
 *               - category
 *               - userID
 *             properties:
 *               name:
 *                 type: string
 *               ingredients:
 *                 type: string
 *               img:
 *                 type: string
 *               category:
 *                 type: string
 *               userID:
 *                 type: integer
 *                 description: ID of the user creating the recipe
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
RecipesRouter.post("/recipe", checkIfUserExist, createNewRecipe);

/**
 * @swagger
 * /recipes/{id}:
 *   put:
 *     summary: Update a recipe by ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The recipe ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               ingredients:
 *                 type: string
 *               img:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Recipe updated successfully
 *       404:
 *         description: Recipe not found
 *       500:
 *         description: Internal server error
 */
RecipesRouter.put("/recipes/:id", checkIfRecipeExist, updateRecipeByID);

// /**
//  * @swagger
//  * /recipes/{id}:
//  *   delete:
//  *     summary: Delete a recipe by ID
//  *     tags: [Recipes]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: integer
//  *         description: The recipe ID
//  *     responses:
//  *       200:
//  *         description: Recipe deleted successfully
//  *       404:
//  *         description: Recipe not found
//  *       500:
//  *         description: Internal server error
//  */
// RecipesRouter.delete('/recipes/:id', deleteRecipe)

export default RecipesRouter;
