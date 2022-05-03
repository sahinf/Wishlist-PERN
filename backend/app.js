const express = require('express');
const app = express();
const cors = require('cors');

//* Access environment variables
require('dotenv').config();
const {SERVER_PORT} = process.env;

//* Middleware (cors is secure) 
app.use(cors());
app.use(express.json())

//* Landing page: can load an html here
app.get('/', (req, res) => {
  res.send("Homepage!");
});

//* Routing: app.use() on all routes
const mountRoutes = require('./routes');
mountRoutes(app);

//! allow api call from react 
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });


//* Default page
app.use('*', (req, res) => {
  res.sendStatus('404').send('Page not found');
});
app.listen(SERVER_PORT, '127.0.0.1', () => {
  console.log(`Server listening on ${SERVER_PORT}`);
})


//** Note
/**
 * exports.handler = async (event)
 * from TIAS lamda functions are only for AWS
 * hosted apps. I cannot use it in our project
 */