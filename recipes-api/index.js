import express from 'express';
import 'dotenv/config'
import RecipesRouter from './routes/RecipesRoutes.js';
import cors from 'cors'


const app = express();
app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))
app.use(cors())
const PORT = process.env.PORT


app.get(`/`, (request, response) => {
    response.json("Welcome to my recipies API")
})

app.use('/api', RecipesRouter)

app.listen(PORT, () =>{
    console.log("Server is listening on port 3000")
})