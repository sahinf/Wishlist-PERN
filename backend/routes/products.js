const e = require('cors');
const Router = require('express-promise-router');

const db = require('../db');

const router = new Router();

module.exports = router;

//* Get all products from database
router.get('/all', async (req, res) => {
  try {
    
    const {rows} = await db.query(
      `SELECT * FROM product`
    );

    res.status(200).json(rows);

  } catch (e) {
    console.error(e.message);
    res.status(501).json('Server query error: /products/all');
  }
});

//* Get 1 single product
router.get('/:id', async (req, res) => {
  try {
    const prod_id = req.id;

    //* Input validaiton
    if (!prod_id) {
      res.status(401).json('Server: Please provide a product id');
    }
    
    const ensureInt = (e) => {
      return Number.isInteger(parseInt(e)) && e >= 0;
    }
    if (!ensureInt(prod_id)) {
      res.status(401).json('Server: Product ID should be an integer');
    }

    //* Query product
    const {rows} = await db.query(
      'SELECT * FROM product WHERE product_id=$1',[prod_id]
    )

    if (rows.length < 1) {
      res.status(404).json('Server query: Request product not found in database');
    }
  } catch (error) {
    console.error(error.message);
    res.status(501).json('Server query error: /products/:id');
  }
});