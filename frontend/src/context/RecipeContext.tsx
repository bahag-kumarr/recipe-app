import type { Recipe } from "../models";
import {type ReactNode, createContext, useEffect, useState} from 'react' 
import axios from 'axios'

interface RecipesContextType {
  recipes: Recipe[];
  loading: boolean;
  error: string;
}

interface Props{
    children: ReactNode;
}

const BASE_URL = `http://localhost:3000`

export const RecipeProvider = ({ children }: Props) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRecipes = async () => {
    console.log(`fetchRecipes() called`);
    setLoading(true);

    try {
      const response = await axios.get(
        `${BASE_URL}/api/recipes`,
      );
      const data: Recipe[] = response.data;
      console.log(response);
      setRecipes(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(`useEffect in RecipeContext called`)
    console.log("ping")
    fetchRecipes();
  }, []);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        loading,
        error,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const RecipeContext = createContext<RecipesContextType | null>(null);
