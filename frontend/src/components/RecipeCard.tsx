import { type Recipe } from "../models"

interface Props {
  recipe: Recipe
  onClick: (id: string) => void
}

const RecipeCard = ({ recipe, onClick }: Props) => {
  return (
    <div 
      onClick={() => onClick(recipe.idMeal)}
      className="border border-gray-600 rounded-lg p-4 m-2 cursor-pointer hover:bg-gray-800 transition-colors"
    >
      <h2 className="text-xl font-bold">{recipe.strMeal}</h2>
      <p className="text-gray-400">{recipe.strCategory} from area {recipe.strArea}</p>
    </div>
  )
}

export default RecipeCard