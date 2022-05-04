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
  
    //* INSERT: Employee ID doesn't exist
    if (test.rowCount < 1) {
      await db.query('INSERT INTO employee (users_id, employee_fname, employee_lname) VALUES ($1, $2, $3)',[users_id, employee_fname, employee_lname]);

      res.status(200).json(`Employee ${employee_fname} ${employee_lname} inserted into table with id ${users_id}`);
    }

    //* UPDATE: Employee ID exists in table
    await db.query('UPDATE employee SET employee_fname=$1,employee_lname=$2 WHERE users_id=$3',[employee_fname, employee_lname, users_id]);

    res.status(200).json(`Employee updated with id=${users_id}, first name=${employee_fname}, last name=${employee_lname}`);
    
  } catch (e) {
    console.error(e.message);
    res.status(500).json('Server error in adding/updating employee')
  }
});

//* REMOVE employee
router.delete('/', async (req, res) => {
  try {
    console.log('Deleting', req.body)
    const {users_id} = req.body;
    if (!users_id) {
      res.status(401).json(`Server: no input provided`);
    }

    const test = await db.query('SELECT * FROM employee WHERE users_id=$1', [users_id]);
    if (test.rowCount < 1) {
      res.status(401).json(`Server: employee id does not exist`);
    }

    //* DELETE if not foreign key in use in another table
    const r = await db.query('DELETE FROM employee WHERE users_id=$1', [users_id]);
    if (!r) {
      res.status(400).json(`Cannot delete entities that are existing as foreign keys of another table`)
    }

    //* DELETE work
    res.status(200).json(`Employee was deleted`);
    
  } catch (e) {
    console.error('ERROR', e.message);
    res.status(501).json("Server: Error in deleting employee");
  }
})