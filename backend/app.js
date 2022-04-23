const http = require('http');
const express = require('express');


const hostname = '127.0.0.1'
const port = 8080

//* Routing
//* basically does "app.use('API_CALL')"

var dogs = require('./routes/dogs');
const app = express();

app.use('/', (req, res) => {
  res.send("Homepage!");
});

app.use('/dogs', dogs);

//* IDK why
app.use(express.json())



const mountRoutes = require('./routes');
mountRoutes(app);


//****** DELETE THIS MAYBE, OR PUT IT IN ITS OWN MODULE N EXPORT IT*/

//** Manual query call using pool */
const pool = require('./db');
const { user } = require('pg/lib/defaults');
const { resolveNaptr } = require('dns');
// const { prototype } = require('aws-sdk/clients/apigateway');

//* https://node-postgres.com/features/queries
const query = {
  name: 'fetch-user',
  text: 'SELECT * FROM users WHERE users_id = $1',
  values: [1],
}
//* This method is not an API call to a query, but rather the query call itself
//* I instead want to make API query calls
//* Daisy-Chaining promises!
// pool.query(query)
//   .then((res) => console.table(res.rows))
//   .catch( (e) => console.log(e));

//* testing a function I am exporting from backend/db/index.js
pool.testing()

//* TRY APIs
// console.log('now testing express route');
// const axios = require('axios');
// axios.get(`http://localhost:${port}/users/34`)
// .then( (res) => console.log(res))
// .catch( (e) => console.log(e))



//* This is useful if 'pool' referred to a Pool object I made,
//* however 'pool' refers to the object we imported from /backend/db/index.js
// pool.connect()
// .then(() => console.log('Connected to database successfully'))
// .then(() => pool.query('SELECT * FROM users')) // this returns results
// .then((results) => console.table(results.rows))
// .catch(e => console.log(e))
// .finally(() => pool.end())

//****** DELETE THIS MAYBE, OR PUT IT IN ITS OWN MODULE N EXPORT IT*/


//**** Create a server object:
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.write('res.write message: Howdy\n');
//   res.end('res.end message: Ending message!\n');
// })

//* Default page
app.use('*', (req, res) => {
  res.sendStatus('404').send('Page not found');
});
http.createServer(app).listen(port, hostname, () =>{
  console.log(`Server listening on https://${hostname}:${port}`);
});