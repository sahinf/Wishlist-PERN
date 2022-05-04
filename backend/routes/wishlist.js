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
      res.json('Wishlist is empty')
    }
    else {
      console.log('Got wishlist: ', rows)
      res.status(200).json(rows);
    }

  } catch (e) {
    console.error(e.stack);
    res.status(500).json('OOPS')
  }
})

router.delete('/', async (req, res) => {
  try {
    const body = req.body;
    const { items } = body;
    if (!body) {
      res.status(400).json('Server: no Body provided in delete request')
    }
    console.log(body)
    const qDelete = `DELETE FROM wishlist WHERE product_id=${items.product_id}`
    console.log('query is', qDelete)
    res.status(200).json("DELETED")
    await db.query(qDelete);
  } catch (e) {
    console.error(e);
    res.status(500).json("Duplicate Key exists, please add another ")
  }
})

router.put('/', async (req, res) => {
  try {
    const body = req.body;
    const { items } = body;
    console.log('putting',body)
    await db.query(`INSERT INTO wishlist(users_id, product_id) VALUES (${items.user_id}, ${items.product_id})`)
    res.status(200).json("DONE")
  } catch (e) {
    console.error(e);
    res.status(500).json("OOPS I MADE A POOPSIE")
  }
})