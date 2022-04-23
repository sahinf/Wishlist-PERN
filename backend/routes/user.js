//* Routing is simply for API calls
//* I am only using it in order to learn
//* How custom APIs can be made with Express routing
//* https://node-postgres.com/guides/async-express

const { json } = require('express');
const Router = require('express-promise-router');

const db = require('../db');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

// export router to be mounted by parent app
module.exports = router;


//**** EXPLANATION / TUTORIAL / TIPS
/**
 * So this the "sub" endpoint for our API beginning with /users
 * ./index.js maps all "https//ip-address/users/" to here
 * users/ ==> all users
 * users/id ==> user with that id
 * 
 * res.send() vs res.json() : https://stackoverflow.com/questions/19041837/difference-between-res-send-and-res-json-in-express-js
 * essentially, json forces the data into json format and calls res.send()
 * res.send(100) will send a status code, res.json(100) will send a json number
 * There is no difference if the returned value is always an array/json
 * 
 */

//* Get all users
router.get('/', async (req, res) => {
  const query = await db.query('SELECT * FROM users');
  res.send(query.rows);
})

//* Get specific user
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query('SELECT * FROM users WHERE users_id = $1', [id]);
  res.send(rows[0]);
})

//* Update password (or anything) of a user
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const newPass = body['user_password'];
  const update = await db.query('UPDATE users SET user_password = $1 WHERE users_id = $2', [newPass, id]);
  res.json('User was updated');
})