import pg from 'pg'


const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'recipes',
  password: 'postgres',
  port: 5433
})

export default pool;