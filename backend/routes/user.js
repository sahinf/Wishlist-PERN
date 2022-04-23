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

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { rows } = await db.query('SELECT * FROM users where users_id = $1', [id]);
  res.send(rows[0]);
})