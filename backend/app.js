const http = require('http');
const express = require('express');
const app = express();


const hostname = '127.0.0.1'
const port = 8080

//* Landing page: can load an html here
app.get('/', (req, res) => {
  res.send("Homepage!");
});

//* IDK why
app.use(express.json())

//* app.use() on all routes
const mountRoutes = require('./routes');
mountRoutes(app);


//****** DELETE THIS MAYBE, OR PUT IT IN ITS OWN MODULE N EXPORT IT*/

//** Manual query call using Pool */
const manual_pool = require('./db');

//* https://node-postgres.com/features/queries
const query = {
  name: 'fetch-user',
  text: 'SELECT * FROM users WHERE users_id = $1',
  values: [1],
}
//* This method is not an API call to a query, but rather the query call itself
//* I instead want to make API query calls - Daisy-Chaining promises!
manual_pool.query(query)
  .then((res) => console.table(res.rows))
  .catch( (e) => console.log(e));

//* testing a function I am exporting from backend/db/index.js
manual_pool.testing()

//* TRY APIs
// console.log('now testing express route');
// const axios = require('axios');
// axios.get(`http://localhost:${port}/users/34`)
// .then( (res) => console.log(res))
// .catch( (e) => console.log(e))



//* This is useful if 'manual_pool' referred to a manual_pool object I made,
//* however 'manual_pool' refers to the object we imported from /backend/db/index.js
// manual_pool.connect()
// .then(() => console.log('Connected to database successfully'))
// .then(() => manual_pool.query('SELECT * FROM users')) // this returns results
// .then((results) => console.table(results.rows))
// .catch(e => console.log(e))
// .finally(() => manual_pool.end())

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