import { useState, useEffect } from "react";

import axios from "axios";

const AddRecipe = ({fetchRecipes}: {fetchRecipes: () =>Promise<void>}) => {
    const [newRecipe, setNewRecipe] = useState({
    idMeal: "",
    strMeal: "",
    strCategory: "",
    strArea: "",
  });
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) =>{
    e.preventDefault()
    try{
        const addNewRecipe = await axios.post('http://localhost:3000/api/recipe', newRecipe)
        console.log(addNewRecipe)
    } catch(err: any){
        setError(err)
    } finally{
        fetchRecipes();
        setNewRecipe({
            idMeal:'',
            strMeal:'',
            strCategory:'',
            strArea:''
        })
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newRecipe.idMeal} onChange={e => setNewRecipe({...newRecipe, idMeal: e.target.value})} />
        <input type="text" value={newRecipe.strMeal}onChange={e => setNewRecipe({...newRecipe, strMeal: e.target.value})} />
        <input type="text" value={newRecipe.strCategory} onChange={e => setNewRecipe({...newRecipe, strCategory: e.target.value})}/>
        <input type="text" value={newRecipe.strArea} onChange={e => setNewRecipe({...newRecipe, strArea: e.target.value})}/>
        <button>Add Recipe</button>
      </form> 
    </>
  );
};

export default AddRecipe;
