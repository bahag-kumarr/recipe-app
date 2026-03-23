import { useState, useEffect } from "react";
import "./App.css";
import AddRecipe from "./components/AddRecipe";
import axios from 'axios'
import {type Recipe} from './models'

function App() {
  const [recipesData, setRecipesData] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/api/recipes`);
      setRecipesData(res.data.meals);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <>
      <h1>Recipe App</h1>
      {!loading &&
        recipesData &&
        recipesData.map((recipe) => {
          return (
            <div key={recipe.idMeal}>
              <h2>{recipe.strMeal}</h2>
              <p>
                {recipe.strCategory} from area {recipe.strArea}
              </p>
            </div>
          );
        })}
      <AddRecipe fetchRecipes={fetchRecipes} />
    </>
  );
}

export default App;
