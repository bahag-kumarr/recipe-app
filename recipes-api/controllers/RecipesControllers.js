import Recipe from "../models/Recipe.js";
import User from "../models/User.js";

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      attributes: ["id", "name", "ingredients", "img", "category", "area"],
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "firstName", "email"],
        },
      ],
    });
    if (recipes.length < 1) {
      return res.status(404).json(`Recipes not found`);
    }
    return res.status(200).json(recipes);
  } catch (err) {
    return res.status(500).json(`Internal server error`);
  }
};

export const createNewRecipe = async (req, res) => {
  const { name, img, ingredients, category } = req.body;
  const userID = req.user.id;
  try {
    const newRecipe = await Recipe.create({
      name,
      img,
      ingredients,
      category,
      userID,
    });
    return res.status(201).json(newRecipe);
  } catch (err) {
    return res.status(500).json(`Internal server error`);
  }
};

export const getRecipeById = async (req, res, recipeID) => {
  console.log(recipeID);

  const { id } = req.params;
  try {
    const recipe = await Recipe.findByPk(id, {
      attributes: ["id", "name", "ingredients", "img", "category"],
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "firstName", "email"],
        },
      ],
    });
    if (!recipe) {
      return res.status(404).json(`No recipe found with this ID`);
    }
    return res.status(200).json(recipe);
  } catch (err) {
    return res.status(500).json(`Internal server error`);
  }
};

export const updateRecipeByID = async (req, res) => {
  const { recipe } = req;
  const { name, ingredients, img, category } = req.body;

  try {
    const updatedRecipe = await recipe.update({
      name,
      ingredients,
      img,
      category,
      userID: recipe.author.id,
    });
    await updatedRecipe.save();
    return res.status(200).json(updatedRecipe);
  } catch (err) {
    console.log(err);
    return res.status(500).json(`Internal server error`);
  }
};
