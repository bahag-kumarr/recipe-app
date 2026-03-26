import { recipesData } from "../data/recipes-data.js";
import pool from "../data/db.js";

export const getAllRecipes = (req, res) => {
  pool
    .query(
      `
  SELECT 
    id,
    id_meal AS "idMeal",
    str_meal AS "strMeal",
    str_category AS "strCategory",
    str_area AS "strArea"
  FROM recipes
`,
    )
    .then((data) => {
      res.json(data.rows);
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(404);
    });
};

export const getRecipeById = (req, res) => {
  const recipeID = req.params.id;
  console.log(req.params.id);
  console.log(recipeID);
  if (!recipeID) {
    return res.json("No recipe id given");
  }

  pool
    .query(
      `SELECT 
    id,
    id_meal AS "idMeal",
    str_meal AS "strMeal",
    str_category AS "strCategory",
    str_area AS "strArea",
    str_meal_thumb as "strMealThumb"
    FROM recipes 
    WHERE id=$1`,
      [recipeID],
    )
    .then((data) => res.json(data.rows))
    .catch((e) => {
      console.log(e);
      res.sendStatus(500);
    });
};

export const createNewRecipe = (req, res) => {
  console.log(req.body);
  const { idMeal, strMeal, strCategory, strArea } = req.body;
  if (!idMeal || !strMeal || !strCategory || !strArea) {
    return res.json("You need to provide all fields");
  }
  try {
    recipesData.meals.push(req.body);
    return res.json(recipesData);
  } catch (err) {
    console.log(err);
    res.status(500).json(`Internal server error`);
  }
};

export const updateRecipe = (req, res) =>{
  console.log("updateRecipe called");
  const id = req.params.id
  const {strMeal} = req.body;
  pool
  .query(
  ` Update recipes
    Set  str_meal=$1
    Where id=$2
    Returning *;
  `,[strMeal, id]
  )
  .then(data => res.status(201).json(data))
  .catch(e => res.sendStatus(404))
}


export const deleteRecipe = (req,res) =>{
  console.log("delete response called");
  const id = req.params.id
  pool
  .query('Delete recipes Where id_meal=$1', [id])
  .then(data => res.sendStatus(201).json(data))
  .catch(e => res.sendStatus(404));

}