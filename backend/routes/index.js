const users = require('./user');
const dogs = require('./dogs');


//* List all other modules to export as router
module.exports = app => {
  app.use('/users', users),
  app.use('/dogs', dogs)
}