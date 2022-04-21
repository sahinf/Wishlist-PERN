const http = require('http');
const express = require('express');


const hostname = '127.0.0.1'
const port = 8080

//* Routing
const mountRoutes = require('./routes');

const app = express();
mountRoutes(app);


//****** DELETE THIS MAYBE, OR PUT IT IN ITS OWN MODULE N EXPORT IT*/

const pool = require('./db/index');
console.log(pool);
pool.query('SELECT * FROM users')
.then( (res) => console.table(res.rows))

// pool.connect()
// .then(() => console.log('Connected to database successfully'))
// .then(() => pool.query('SELECT * FROM users')) // this returns results
// .then((results) => console.table(results.rows))
// .catch(e => console.log(e))
// .finally(() => pool.end())

//* Now repeat above process with ASYNC

//****** DELETE THIS MAYBE, OR PUT IT IN ITS OWN MODULE N EXPORT IT*/


// const db = require('./db');
// const { password } = require('pg/lib/defaults');
// const client = require('pg/lib/native/client');


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
