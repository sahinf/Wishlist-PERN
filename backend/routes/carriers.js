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

    res.status(200).json(data.rows);

  } catch (e) {
    console.error(e.message);
    res.status(500).json("Sever: Error in getting all carriers");
  }
});

//* CREATE or UPDATE carrier
router.put('/', async (req, res) => {
  try {
    const { carrier_id, carrier_name, carrier_phone } = req.body;
    if (!carrier_id || !carrier_name || !carrier_phone) {
      res.status(400).json("Server: No input provided for carrier query");
    }

    const test = await db.query('SELECT * FROM carrier WHERE carrier_id=$1', [carrier_id]);

    //* INSERT: Carrier ID doesn't exist
    if (test.rowCount < 1) {
      await db.query('INSERT INTO carrier (carrier_id, carrier_name, carrier_phone) VALUES ($1, $2, $3)', [carrier_id, carrier_name, carrier_phone]);

      res.status(200).json(`Carrier ${carrier_name} inserted into table with phone number ${carrier_phone}`)
    }
    
    //* UPDATE: Carrier ID exists in table
    await db.query('UPDATE carrier SET carrier_name=$1,carrier_phone=$2 WHERE carrier_id=$3',[ carrier_name, carrier_phone, carrier_id]);
    
    res.status(200).json(`Carrier ${carrier_name} was updated with phone number ${carrier_phone}`);

  } catch (e) {
    console.error(e.message);
    res.status(500).json("Sever error in adding/updating carrier");
  }
})

//* REMOVE carrier
router.delete('/', async (req, res) => {
  try {

    const { carrier_id } = req.body;
    if (!carrier_id) {
      res.status(401).json("Server: No input provided");
    }

    const test = await db.query('SELECT * FROM carrier WHERE carrier_id=$1', [carrier_id]);
    if (test.rowCount < 1) {
      res.status('401').json('Carrier ID does not exist');
    }


    //* This will NOT delete carriers that are foreign keys in other tables: REFERENTIAL INTEGRITY
    const r = await db.query('DELETE FROM carrier WHERE carrier_id=$1', [carrier_id]);

    //* Let user know that the query failed because they tried to delete existing foreign key
    if (!r) {
      res.status(400).json('Cannot delete carriers that are existing foreign keys in other tables')
    }

    res.status(200).json('Carrier was deleted!');

  } catch (e) {
    console.error('ERROR', e.message);
    res.status(501).json("Server: Error in deleting carrier");
  }
})