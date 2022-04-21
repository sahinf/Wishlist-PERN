const users = require('./user');


//* List all other modules to export as router
module.exports = app => {
  app.use('/users', users)
}