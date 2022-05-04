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

    res.status(200).json({ count: rows.length });

  } catch (e) {
    console.error(e.message);
    res.status(501).json("Sever Error in querying wishlist count");
  }
});

//* DEMO
//* Get a bunch of info on the customer's wishlist
router.get('/:id', async (req, res) => {
  const users_id = req.params.id;
  try {
    const clause = `product.product_desc, product.product_price`
    const { rows } = await db.query(`
    SELECT * 
    FROM product
    INNER JOIN wishlist ON wishlist.product_id = product.product_id
    INNER JOIN carrier ON carrier.carrier_id = product.carrier_id
    INNER JOIN manufacturer ON manufacturer.man_id = product.man_id
    WHERE wishlist.users_id = ${users_id}
    `)
    if (rows.length < 1) {
      res.status(200).json('Wishlist is empty')
    }
    console.log('Got wishlist: ', rows)
    res.status(200).json(rows);

  } catch (e) {
    console.error(e.stack);
    res.status(500).json('OOPS')
  }
})