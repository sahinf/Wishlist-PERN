const token_key = "token";

const getToken = () => {
  return localStorage.getItem(token_key);
}

export default getToken;