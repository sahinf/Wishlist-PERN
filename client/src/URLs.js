const localHost = true;

const local_ip = `http://127.0.0.1`;
// const local_ip = `localhost`
const local_port = `8080`;
const localURL = `${local_ip}:${local_port}`;



const requestDomainName = () => {
  return localHost ? localURL : "ENTER SERVER URL"
}

const domainName = requestDomainName();

//* All users API
const usersURL = () => `${domainName}/users`;

//* Specific user API
const userIdURL = (userId) => `${usersURL()}/${userId}`;

//* Login API
const loginURL = () => `${domainName}/login`;

//***** WIISHLIST API URLs */
const wishlistURL = () => `${domainName}/wishlist/`;

const wishlistUser = (user_id) => `${wishlistURL()}/${user_id}`;

const wishlistCountURL = () => `${wishlistURL()}/count`;

const wishlistInsertURL = () => `${wishlistURL()}/insert`;

const wishlistDeleteURL = () => `${wishlistURL()}/delete`;

//***** PRODUCTS API URLs */
const productsURL = () => `${domainName}/products`;

const getAllProductsURL = () => `${productsURL()}/all`;

const getOneProductURL = () => (product_id) => `${productsURL()}/:${product_id}`;

//***** CARRIERS API URLS */
const carriersURL = () => `${domainName}/carriers`;

//***** EMPLOYEES API URLS */
const employeesURL = () => `${domainName}/employees`;

//***** MANUFACTURER API URLS */
const manufacturerURL = () => `${domainName}/manufacturers`;
//! Notice that they're all the same. We are using GET, PUT, and DEL requests to the same API route
const getManURL = () => manufacturerURL();
const putManURL = () => manufacturerURL();
const delManURL = () => manufacturerURL();

export default {
  requestDomainName,
  usersURL,
  userIdURL,
  loginURL,
  wishlistUser,
  wishlistCountURL,
  wishlistInsertURL,
  wishlistDeleteURL,
  getAllProductsURL,
  getOneProductURL,
  carriersURL,
  employeesURL,
  getManURL,
  putManURL,
  delManURL,
}
