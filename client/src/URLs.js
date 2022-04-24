const localHost = true;

const localURL = `https://localhost:8080`;

const requestDomainName = () => {
  return localHost ? localURL : "ENTER SERVER URL"
}

const domainName = requestDomainName();

const usersURL = () => {
  return `/${domainName}/users`
}

const userIdURL = (userId) => {
  return `${usersURL}/${userId}`;
}

export {
  requestDomainName,
  usersURL,
  userIdURL
}
