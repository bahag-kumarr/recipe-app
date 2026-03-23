import { useState, useEffect, useContext } from "react";
import "./App.css";
import AddRecipe from "./components/AddRecipe";
import axios from 'axios'
import {type Recipe} from './models'
import { RecipeContext } from "./context/RecipeContext";

function App() {
  const ctx = useContext(RecipeContext);

  return (
    <>
      <h1>Recipe App</h1>
      {!ctx?.loading &&
        ctx?.recipes &&
        ctx.recipes.map((recipe) => {
          return (
            <div key={recipe.idMeal}>
              <h2>{recipe.strMeal}</h2>
              <p>
                {recipe.strCategory} from area {recipe.strArea}
              </p>
            </div>
          );
        })}
      <AddRecipe />
    </>
  );
}

export default App;
