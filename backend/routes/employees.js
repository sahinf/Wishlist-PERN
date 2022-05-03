const Router = require('express-promise-router');

const db = require('../db');

const router = new Router();

module.exports = router;

//* Get all employees
router.get('/', async (req, res) => {
  try {
    const data = await db.query(
      'SELECT * from employee'
    );

    if (data.rowCount < 1) {
      res.status(404).json('Server: No employees in Employee table')
    }
    res.status(200).json(data.rows);

  } catch (e) {
    console.error(e.message);
    res.status(500).json('Server error in getting all employees');
  }
});

//* CREATE or UPDATE employee
router.put('/', async (req, res) => {
  try {
    const {users_id, employee_fname, employee_lname } = req.body;

    if (!users_id || !employee_fname || !employee_lname) {
      res.status(400).json('Server: no input provided for employee query');
    }

    const test = await db.query('SELECT * FROM employee WHERE users_id=$1',[users_id]);

    //* Employee doesn't exist, INSERT it
    if (test.rowCount < 1) {
      await db.query('INSERT INTO employee ')
    }
    
  } catch (e) {
    console.error(e.message);
    res.status(500).json('Server error in adding/updating employee')
  }
});