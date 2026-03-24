import axios from "axios";
import { useParams } from "react-router";
import { useState, useEffect} from "react";
import type { Recipe } from "../models";
import Spinner from "./Spinner";

const RecipeDetails = () => {
  const BASE_URL = `http://localhost:3000/api/recipes`;
  const { mealId } = useParams();
  const [recipe, setRecipe] = useState<Recipe>();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  console.log(typeof mealId);
  console.log(mealId)

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/${mealId}`);
      const data: Recipe = response.data;
      setRecipe(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  if (error) return <h1>{error}</h1>;
  if (loading) return <Spinner />;

  return (
    <>
      <h1>{recipe?.strMeal}</h1>
      <h3>
        {recipe?.strCategory} from {recipe?.strArea}
      </h3>
    </>
  );
};

export default RecipeDetails;
