const localHost = true;

const localURL = `http://127.0.0.1:8080`;

const requestDomainName = () => {
  return localHost ? localURL : "ENTER SERVER URL"
}

const domainName = requestDomainName();

//* All users API
const usersURL = () => `${domainName}/users/`;

//* Specific user API
const userIdURL = (userId) => `${usersURL}/${userId}/`;

//* Login API
const loginURL = () => `${domainName}/login/`;

//***** WIISHLIST API URLs */
const wishlistURL = () => `${domainName}/wishlist`

const wishlistUser = (user_id) => `${wishlistURL}/${user_id}`

const wishlistCountURL = () => `${wishlistURL}/count`

const wishlistInsertURL = () => `${wishlistURL}/insert`

const wishlistDeleteURL = () => `${wishlistURL}/delete`

//***** PRODUCTS API URLs */
const productsURL = () => `${domainName}/products`

const getAllProductsURL = () => `${productsURL}/all`

const getOneProductURL = () => (product_id) => `${productsURL}/:${product_id}`


export {
  requestDomainName,
  usersURL,
  userIdURL,
  loginURL,
  //* wishlists APIs
  wishlistUser,
  wishlistCountURL,
  wishlistInsertURL,
  wishlistDeleteURL,
  //* products APIs
  getAllProductsURL,
  getOneProductURL
}
