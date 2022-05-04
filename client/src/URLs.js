const localHost = true;

const local_ip = `http://127.0.0.1`;
// const local_ip = `localhost`
const local_port = `8080`;
const localURL = `${local_ip}:${local_port}`;



const requestDomainName = () => {
  return localHost ? localURL : "ENTER SERVER URL"
}

const domainName = requestDomainName();
//***** GLOBAL CRUD API */
const genericCRUD = () => `${domainName}/CRUD`;

//* All users API
const usersURL = () => `${domainName}/users`;

//* Specific user API
const userIdURL = (userId) => `${usersURL()}/${userId}`;

//* Login API
const loginURL = () => `${domainName}/login`;

//***** WIISHLIST API URLs */
const wishlistURL = () => `${domainName}/wishlist`;

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
// const employeesURL = () => `${domainName}/employees`;
const employeesURL = () => `${genericCRUD()}`;
const getEmpURL = (table) => `${employeesURL()}/${table}`;
const putEmpURL = () => `${employeesURL()}`;
const delEmpURL = () => `${employeesURL()}`;

//***** MANUFACTURER API URLS */
const manufacturerURL = () => `${genericCRUD()}`;
const getManURL = (table) => `${manufacturerURL()}/${table}`;
const putManURL = () => manufacturerURL();
const delManURL = () => manufacturerURL();

//***** MEMBERSHIP API URLS */
const membershipURL = () => `${genericCRUD()}`;
const getMemURL = (table) => `${membershipURL()}/${table}`;
const putMemURL = () => `${membershipURL()}`;
const delMemURL = () => `${membershipURL()}`;

//***** CUSTOMER CART/WISHLIST API URLS */
// const wishlist

//**** PRODUCT REVIEW API URLS */
const reviewURL = () => `${domainName}/reviews`
const getRevURL = (user) => `${reviewURL()}/${user}`
const putRevURL = () => `${genericCRUD()}`
const delRevURL = () => `${genericCRUD()}`

//**** PRODUCT COMPLAINT API URLS */
const complaintURL = () => `${genericCRUD()}`
const getComURL = (table) => `${complaintURL()}/${table}`
const putComURL = () => `${complaintURL()}`
const delComURL = () => `${complaintURL()}`

//**** ACCOUNT INFO API URLS */
const accountURL = () => `${genericCRUD()}`
const getAccURL = (table) => `${accountURL()}/${table}`
const putAccURL = () => `${accountURL()}`
const delAccURL = () => `${accountURL()}`

export default {
  requestDomainName,
  genericCRUD,
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
  getEmpURL,
  putEmpURL,
  delEmpURL,
  getManURL,
  putManURL,
  delManURL,
  getMemURL,
  putMemURL,
  delMemURL,
  getRevURL,
  putRevURL,
  delRevURL,
  getComURL,
  putComURL,
  delComURL,
  getAccURL,
  putAccURL,
  delAccURL
}
