import { recipesData } from "../data/recipes-data.js";

export const getAllRecipes = (req, res) => {
  try {
    if (!recipesData) {
      return res.json(`No data available`);
    }
    return res.json(recipesData);
  } catch (err) {
    console.log(err);
    res.status(500).json(`Internal server error`);
  }
};

export const getRecipeById = (req, res) => {
  const recipeID = req.params.id;
  console.log(req.params.id);
  console.log(recipeID);
  if (!recipeID) {
    return res.json("No recipe id given");
  }
  try {
    const findRecipeById = recipesData.meals.find(
      recipe => recipe.idMeal === recipeID,
    );
    if (!findRecipeById) {
      return res.json("No recipe with the given id found");
    }
    return res.json(findRecipeById);
  } catch (err) {
    console.log(err);
    res.status(500).json(`Internal server error`);
  }
};

export const createNewRecipe = (req, res) => {
  const { idMeal, strMeal, strCategory, strArea } = req.body;
  if (!idMeal || !strMeal || !strCategory || !strArea) {
    return res.json("You need to provide all fields");
  }
  try {
    recipesData.push(req.body);
    return res.json(recipesData);
  } catch (err) {
    console.log(err);
    res.status(500).json(`Internal server error`);
  }
};
