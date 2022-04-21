// LINK: https://node-postgres.com/guides/async-express

const { Pool } = require('pg');

// to test with Nullish Coalescing
const env_var_placeholder = null;

//* Nullish ?? Chooses the RHS if LHS is null or undefined
//* Nullish breaks compilation
const USER = 'postgres';
const PASS = '310project';
const HOST = 'csce-310-db.c9ngvmqcspz8.us-east-1.rds.amazonaws.com'
const PORT = '5432'
const DTBS = 'postgres';

const pool = new Pool({
  user: USER,
  password: PASS,
  host: HOST,
  port: PORT,
  database: DTBS
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}