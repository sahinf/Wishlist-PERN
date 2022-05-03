const users = require('./user');
const dogs = require('./dogs');
const login = require('./login');
const wishlist = require('./wishlist');
const products = require('./products');
const carriers = require('./carriers');
const employees = require('./employees');


//* List all other modules to export as router
module.exports = app => {
  app.use('/users', users),
  app.use('/dogs', dogs),
  app.use('/login', login),
  app.use('/wishlist', wishlist),
  app.use('/products', products),
  app.use('/carriers', carriers),
  app.use('/employees', employees)
};