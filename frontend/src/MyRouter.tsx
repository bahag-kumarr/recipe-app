import {Routes, Route} from 'react-router'
import App from './App';
import RecipeDetails from './components/RecipeDetails';
const MyRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path='/api/recipes/:mealId' element={<RecipeDetails />}/>
            <Route path='*' element={<h1>Page n ot fou d</h1>}/>
        </Routes>
    );
}

export default MyRouter;