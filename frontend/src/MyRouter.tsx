import {Routes, Route} from 'react-router'
import App from './App';
const MyRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            {/* <Route path='/meal/:mealId' element={<MealComponent/>}/> */}
            <Route path='*' element={<h1>Page n ot fou d</h1>}/>
        </Routes>
    );
}

export default MyRouter;