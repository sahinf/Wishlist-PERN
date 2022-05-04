const Router = require('express-promise-router');
const db = require('../db');
const router = new Router();
module.exports = router;

/**
 * GENERICS
 * Queries made extremely general
 * to fit any regular CRUD request
 */

//* Generic GET all from any table
//* a GET request's body should not have any semantic meaning in parsing the table (ours does), however this saves time and the project isn't about following correct HTTP protocol
router.get('/:table', async (req, res) => {
  const { table } = req.params;
  if (!table) {
    res.status(400).json(`Provide a table name in URL eg localhost:<port>/CRUD/<table>`)
  }
  try {
    const data = await db.query(`SELECT * FROM ${table}`);

    if (!data) {
      res.status(404).json(`Table [${table}] does not exist`)
    }

    if (data?.rowCount < 1) {
      res.status(404).json(`No data in table [${table}]`);
    }
    // console.log('done\n', data.rows)
    res.status(200).json(data.rows);
  }
  catch (e) {
    console.error(e.message);
    res.status(500).json(`Server error in getting all rows from table [${table}]`);
  }
});

//* CREATE or UPDATE from table
router.put('/', async (req, res) => {
  const body = req.body;
  if (!body) {
    res.status(400).json('Server: no BODY provided in put request');
  }

  const { pk, table } = body;
  console.log('Generic PUT input:', body);

  try {
    const attributes = body.items;
    console.log('attributes', attributes)

    //* Test if PK is provided: no ==> insert
    const ins = attributes[pk];
    console.log('ins', ins)
    let test = undefined
    if (ins != undefined) {
      //* See if pk exists in table
      const q1 = `SELECT * FROM ${table} WHERE ${pk}=${attributes[pk]}`
      test = await db.query(q1);
    }

    //* INSERT: pk NOT EXIST in table
    if (test == undefined || test.rowCount < 1) {

      let keys = ""
      let vals = ""
      //* Splice object into (key1, key2,...), (val1, val2,...)
      for (const [key, value] of Object.entries(attributes)) {
        keys += `${key},`
        vals += `'${value}',`
      }
      //* Remove last comma
      keys = keys.slice(0, -1);
      vals = vals.slice(0, -1);
      const insertQ = `INSERT INTO ${table}(${keys}) VALUES (${vals})`;
      console.log('Insert query: ', insertQ)
      await db.query(insertQ);
      res.status(200).json(`Inserted ${pk} into ${table}`)
    }

    else {

      //* UPDATE: pk EXIST in table

      let keyVals = ""
      //* Splice object intro (key1=val1, ...) and ignore PK
      for (const [key, value] of Object.entries(attributes)) {
        if (key !== pk)
          keyVals += `${key}='${value}',`
      }
      keyVals = keyVals.slice(0, -1);

      const updateQ = `UPDATE ${table} SET ${keyVals} WHERE (${pk}=${attributes[pk]})`;
      console.log(`Update query: `, updateQ)
      await db.query(updateQ)
      res.status(200).json(`Updated ${pk}`)
    }

  } catch (e) {
    console.error(e);
    res.status(500).json(e.detail);
  }
});

//* REMOVE something 
router.delete('/', async (req, res) => {
  try {
    console.log(`generic DELETE input: `, req.body);
    const body = req.body;
    if (!body) {
      res.status(400).json('Server: no Body provided in delete request')
    }
    const { pk, table } = body;
    const pkVal = body.items[pk];

    const queryDelete = `DELETE FROM ${table} WHERE ${pk}=${pkVal}`;
    await db.query(queryDelete);
    res.status(200).json('Successfully Deleted');

  } catch (e) {
    console.error(e);
    res.status(500).json(e.routine);
  }
})