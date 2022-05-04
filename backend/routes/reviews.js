const Router = require('express-promise-router');
const db = require('../db');
const router = new Router();
module.exports = router;

router.get('/:users_id', async (req, res) => {

  console.log('gets params: ', req.params)
  const { users_id } = req.params;

  const q = `SELECT reviews.review_id, reviews.review_rating, reviews.review_text , product.product_desc, product.product_price
  FROM reviews
  INNER JOIN product
  ON reviews.product_id = product.product_id
  WHERE reviews.users_id = ${users_id}
  `;

  const r = await db.query(q);
  console.log(r.rows)
  res.json(r.rows)
  // db.query()

});

router.put('/', async (req, res) => {
  try {

    const body = req.body;

    const { items } = body;

    console.log('req body: ', body)
    console.log(items.product_desc)
    try {
      const q1 = `SELECT product_id FROM product WHERE product_desc=${items.product_desc}`
      const id = await db.query(q1);
      console.log('id ', id)

    } catch (e) {
      console.error(e.message)
      res.status(400).json('product description doesnt exist in product table')
    }



  } catch (error) {
    console.error(error.stack)
    res.json(error.message)
  }
})