const localHost = true;

const localURL = `https://localhost:8080/`;

const requestDomainName = () => {
  return localHost ? localURL : "ENTER SERVER URL"
}

const domainName = requestDomainName();

//* All users API
const usersURL = () => { return `${domainName}/users/`; }

//* Specific user API
const userIdURL = (userId) => { return `${usersURL}/${userId}/`; }

//* Login API
const loginURL = () => { return `${domainName}/login/`; }

export {
  requestDomainName,
  usersURL,
  userIdURL,
  loginURL
}