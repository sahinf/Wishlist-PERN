const Router = require('express-promise-router');

const db = require('../db');

const router = new Router();

module.exports = router;

router.get('/', async (req, res) => {
  try {
    const data = await db.query(
      'SELECT * FROM carrier'
    );

    if (data.rowCount < 1) {
      res.status(404).json('Server: No carriers in Carrier table')
    }

    // res.status(200).send(data.rows);
    // const obj = data.rows;
    res.status(200).json(data.rows);

  } catch (e) {
    console.error(e.message);
    res.status(501).json("Sever: Error in querying carriers");
  }
});