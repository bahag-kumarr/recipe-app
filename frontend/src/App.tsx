import { useState, useEffect, useContext } from "react";
import "./App.css";
import AddRecipe from "./components/AddRecipe";
import axios from "axios";
import { type Recipe } from "./models";
import { RecipeContext } from "./context/RecipeContext";
import RecipeCard from "./components/RecipeCard";

function App() {
  const ctx = useContext(RecipeContext);

  return (
    <>
      <h1>Recipe App</h1>
      {!ctx?.loading &&
        ctx?.recipes &&
        ctx.recipes.map((recipe) => {
          return (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              onClick={(id) => console.log("clicked:", id)}
            />
          );
        })}
      <AddRecipe />
    </>
  );
}

export default App;
