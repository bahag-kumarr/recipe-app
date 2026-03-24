import { useNavigate } from "react-router";
import { type Recipe } from "../models";
import { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";

interface Props {
  recipe: Recipe;
  onClick: (id: string) => void;
  editFn: (id: string) => void;
}

const RecipeCard = ({ recipe, onClick, editFn }: Props) => {
  return (
    <div className="flex items-center justify-between  border border-gray-600 rounded-lg p-4 m-2 cursor-pointer hover:bg-gray-800 transition-colors">
      <div onClick={() => onClick(recipe.id)} className="cursor-pointer">
        <h2 className="text-sm font-bold">{recipe.strMeal}</h2>
        <p className="text-gray-400 text-sm">
          {recipe.strCategory} from area {recipe.strArea}
        </p>
      </div>
      <button
        onClick={() => editFn(recipe.id)}
        className="p-2 hover:text-blue-400 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </button>
    </div>
  );
};

export default RecipeCard;
