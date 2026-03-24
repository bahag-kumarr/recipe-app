import pg from 'pg'
import { recipesData } from './recipes-data.js'

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'recipes',
  password: 'postgres',
  port: 5433
})

const insertRecipes = async () => {
  for (const meal of recipesData.meals) {
    await pool.query(
      `INSERT INTO meals (
        id_meal, str_meal, str_category, str_area, str_instructions,
        str_meal_thumb, str_tags, str_youtube, str_source, date_modified,
        str_ingredient1, str_ingredient2, str_ingredient3, str_ingredient4, str_ingredient5,
        str_measure1, str_measure2, str_measure3, str_measure4, str_measure5
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)
      ON CONFLICT (id_meal) DO NOTHING`,
      [
        meal.idMeal, meal.strMeal, meal.strCategory, meal.strArea, meal.strInstructions,
        meal.strMealThumb, meal.strTags, meal.strYoutube, meal.strSource, meal.dateModified,
        meal.strIngredient1, meal.strIngredient2, meal.strIngredient3, meal.strIngredient4, meal.strIngredient5,
        meal.strMeasure1, meal.strMeasure2, meal.strMeasure3, meal.strMeasure4, meal.strMeasure5
      ]
    )
  }
  console.log('Done!')
  await pool.end()
}

insertRecipes()