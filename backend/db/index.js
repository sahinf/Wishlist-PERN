require('dotenv').config();
const {DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_DTBS} = process.env;
const { Pool } = require('pg');

const pool = new Pool({
  user: DB_USER,
  password: DB_PASS,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_DTBS
})

//* This exports the 'query' function that (for example) gets used in /routes/user.js etc
module.exports = {
  query: (text, params) => pool.query(text, params).catch( (e) => console.error(e)),
  testing: (text, params) => console.log('\n\nTesting an exported function')
}