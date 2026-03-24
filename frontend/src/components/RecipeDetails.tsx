import axios from "axios";
import { useParams } from "react-router";
import { useState, useEffect} from "react";
import type { Recipe } from "../models";
import Spinner from "./Spinner";

const RecipeDetails = () => {
  const BASE_URL = `http://localhost:3000/api/recipes`;
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe>();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  console.log(typeof id);
  console.log(id)

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      const data: Recipe []= response.data;
      console.log(data)
      setRecipe(data[0]);
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
  <div className="flex gap-8 p-8 items-center">
    <img src={recipe?.strMealThumb} className="w-64 h-64 rounded-lg object-cover" />
    <div>
      <h1 className="text-3xl font-bold">{recipe?.strMeal}</h1>
      <h3 className="text-gray-400 mt-2">{recipe?.strCategory} from {recipe?.strArea}</h3>
    </div>
  </div>
)
};

export default RecipeDetails;

