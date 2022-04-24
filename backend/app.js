const express = require('express');
const app = express();
const cors = require('cors');

//* Access environment variables
require('dotenv').config();
const {PORT} = process.env;

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


//* Default page
app.use('*', (req, res) => {
  res.sendStatus('404').send('Page not found');
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})


//** Note
/**
 * exports.handler = async (event)
 * from TIAS lamda functions are only for AWS
 * hosted apps. I cannot use it in our project
 */