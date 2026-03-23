import { useState, useEffect, useContext } from "react";

import axios from "axios";
import { RecipeContext } from "../context/RecipeContext";

const AddRecipe = () => {
  const [newRecipe, setNewRecipe] = useState({
    idMeal: "",
    strMeal: "",
    strCategory: "",
    strArea: "",
  });
  const ctx = useContext(RecipeContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const addNewRecipe = await axios.post(
        "http://localhost:3000/api/recipe",
        newRecipe,
      );
      console.log(addNewRecipe);
    } catch (err: any) {
      setError(err);
    } finally {
      setNewRecipe({
        idMeal: "",
        strMeal: "",
        strCategory: "",
        strArea: "",
      });
    }
  };
  return (
    <div className="bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-600 p-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="ID"
          value={newRecipe.idMeal}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, idMeal: e.target.value })
          }
          className="bg-gray-700 text-white px-3 py-2 rounded flex-1"
        />
        <input
          type="text"
          placeholder="Meal"
          value={newRecipe.strMeal}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, strMeal: e.target.value })
          }
          className="bg-gray-700 text-white px-3 py-2 rounded flex-1"
        />
        <input
          type="text"
          placeholder="Category"
          value={newRecipe.strCategory}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, strCategory: e.target.value })
          }
          className="bg-gray-700 text-white px-3 py-2 rounded flex-1"
        />
        <input
          type="text"
          placeholder="Area"
          value={newRecipe.strArea}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, strArea: e.target.value })
          }
          className="bg-gray-700 text-white px-3 py-2 rounded flex-1"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
