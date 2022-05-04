const Router = require('express-promise-router');
const db = require('../db');
const router = new Router();
module.exports = router;

//* Get wishlist count!
router.post('/count', async (req, res) => {
  try {
    const id = req.body['users_id'];
    if (!id) {
      return res.status(401).json("wishlist/count: Please provide a user_id");
    }

    const { rows } = await db.query(
      'SELECT * FROM wishlist where users_id=$1', [id]
    );

    res.status(200).json( {count: rows.length});

  } catch (e) {
    console.error(e.message);
    res.status(501).json("Sever Error in querying wishlist count");
  }
});