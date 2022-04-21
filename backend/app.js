const http = require('http')

const hostname = '127.0.0.1'
const port = 8080

//* Routing
const express = require('express');
const mountRoutes = require('./routes');

const app = express();
mountRoutes(app);


// Create a server object:
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello, slut!\n')
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
