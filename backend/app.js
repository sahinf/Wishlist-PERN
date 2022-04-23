const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');

const hostname = '127.0.0.1'
const port = 8080

//* Middleware (idk why yet) 
app.use(cors());
app.use(express.json())
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

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
http.createServer(app).listen(port, hostname, () =>{
  console.log(`Server listening on https://${hostname}:${port}`);
});


//** Note
/**
 * exports.handler = async (event)
 * from TIAS lamda functions are only for AWS
 * hosted apps. I cannot use it in our project
 */