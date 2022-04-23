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

//* Default page
app.use('*', (req, res) => {
  res.sendStatus('404').send('Page not found');
});
http.createServer(app).listen(port, hostname, () =>{
  console.log(`Server listening on https://${hostname}:${port}`);
});