//* Routing is simply for API calls
//* I am only using it in order to learn
//* How custom APIs can be made with Express routing
//* https://node-postgres.com/guides/async-express

const Router = require('express-promise-router');

const db = require('../db');

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router();

// export router to be mounted by parent app
module.exports = router;


//**** EXPLANATION / TUTORIAL
/**
 * So this the "sub" endpoint for our API beginning with /users
 * ./index.js maps all "https//ip-address/users/" to here
 * users/ ==> all users
 * users/id ==> user with that id
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