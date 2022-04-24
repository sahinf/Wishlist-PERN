const Router = require('express-promise-router');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require("../utils/jwt-generator");

const router = new Router;
module.exports = router;


//* Post request to check user credentials
router.post('/', async (req, res) => {
  try {
    const id = req.body['users_id'];
    const password = req.body['user_password'];

    //* no input provided
    if (!id || !password) {
      return res.status(401).json("Please Fill Info");
    }

    //* query password of given user_id
    const user = await db.query(`SELECT * FROM users WHERE users_id = $1`, [id]);

    //* user_id not in db
    if (user.rowCount < 1) {
      res.status(401).json('User with id does not exist')
    }

    const { rows } = user;
    console.log(rows[0].user_password);
    console.log(password)

    //* handle user_password != password
    //! Changed user_password VARCHAR length in table to 60 from 50 so it works
    //! I realized that the passwords stored in the DB are not hashed to begin with,
    //! So do not try to hash :)
    // const isValidPassword = await bcrypt.compare(
    //   password,
    //   rows[0].user_password
    // );

    const isValidPassword = (password === rows[0].user_password);

    // console.log(isValidPassword);

    //* handle wrong password
    if (!isValidPassword) {
      res.status(401).json('Wrong password!');
    }

    //* generate token for user
    console.log(rows[0])
    console.log(rows[0].users_id)
    const token = await jwtGenerator({
      id: rows[0].users_id
      //! Can add more things to tokenize (email, name, etc)
    }).catch((e) => { console.error(e.message) })

    //* send token
    res.json(token);

  } catch (e) {
    console.error(e.message);
    res.status(500).json(e.message);
  }
});