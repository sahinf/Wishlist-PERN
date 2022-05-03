const Router = require('express-promise-router');

const db = require('../db');

const router = new Router();

module.exports = router;

//* GET all carriers
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
    res.status(501).json("Sever: Error in getting all carriers");
  }
});

//* CREATE or UPDATE carrier
//TODO if exists, update
router.put('/', async (req, res) => {
  try {
    const { carrier_name, carrier_phone } = req.body;
    if (!carrier_name || !carrier_phone) {
      res.status(401).json("Server: No input provided");
    }

    await db.query('INSERT INTO carrier (carrier_name, carrier_phone) VALUES ($1, $2)', [carrier_name, carrier_phone]);

    res.status(200).json('Carrier was inserted!');

  } catch (e) {
    console.error(e.message);
    res.status(501).json("Sever: Error in adding carrier");
  }
})

//* REMOVE carrier
router.delete('/', async (req, res) => {
  try {
    const { carrier_name } = req.body;
    if (!carrier_name) {
      res.status(401).json("Server: No input provided");
    }

    await db.query('DELETE FROM carrier WHERE carrier_name=$1', [carrier_name]);

    res.status(200).json('Carrier was deleted!');

  } catch (e) {
    console.error(e.message);
    res.status(501).json("Sever: Error in deleting carrier");
  }
})