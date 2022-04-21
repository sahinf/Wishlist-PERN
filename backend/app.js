const http = require('http');
const express = require('express');


const hostname = '127.0.0.1'
const port = 8080

//* Routing
const mountRoutes = require('./routes');

const app = express();
mountRoutes(app);


//****** DELETE THIS MAYBE, OR PUT IT IN ITS OWN MODULE N EXPORT IT*/

const pool = require('./db');

//* https://node-postgres.com/features/queries
const query = {
  name: 'fetch-user',
  text: 'SELECT * FROM users WHERE users_id = $1',
  values: [1],
}

pool.query(query)
.then( (res) => console.table(res.rows))

//* TRY APIs
// console.log('now testing express route');
// const axios = require('axios');
// axios.get(`http://localhost:${port}/users/34`)
// .then( (res) => console.log(res))
// .catch( (e) => console.log(e))



// app.use()
// pool.connect()
// .then(() => console.log('Connected to database successfully'))
// .then(() => pool.query('SELECT * FROM users')) // this returns results
// .then((results) => console.table(results.rows))
// .catch(e => console.log(e))
// .finally(() => pool.end())

//****** DELETE THIS MAYBE, OR PUT IT IN ITS OWN MODULE N EXPORT IT*/


// Create a server object:
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write('Howdy\n');
  res.end('Hello, slut!\n');
})

// Set up our server so it will listen on the port
server.listen(port, hostname, (error) => {

  // Checking any error occur while listening on port
  if (error) {
    console.log('Something went wrong', error);
  }
  // Else sent message of listening
  else {
    console.log(`Server running at http://${hostname}:${port}/`);
  }
})
