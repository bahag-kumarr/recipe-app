import { useState, useEffect, useContext } from "react";
import "./App.css";
import AddRecipe from "./components/AddRecipe";
import axios from "axios";
import { type Recipe } from "./models";
import { RecipeContext } from "./context/RecipeContext";
import RecipeCard from "./components/RecipeCard";
import { useNavigate } from "react-router";

function App() {
  const ctx = useContext(RecipeContext);
  const navigate = useNavigate();
  return (
    <>
      <h1>Recipe App</h1>
      {!ctx?.loading &&
        ctx?.recipes &&
        ctx.recipes.map((recipe) => {
          return (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={(id) => navigate(`/api/recipes/${id}`)}
            editFn={(id) => navigate(`/api/recipes/edit/${id}`)}/>
          );
        })}
      <AddRecipe />
    </>
  );
}

export default App;
