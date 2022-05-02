const users = require('./user');
const dogs = require('./dogs');
const login = require('./login');
const wishlist = require('./wishlist');


//* List all other modules to export as router
module.exports = app => {
  app.use('/users', users),
  app.use('/dogs', dogs),
  app.use('/login', login),
  app.use('/wishlist', wishlist)
};