import jwtDecode from "jwt-decode";
import getToken from "./getToken";

const activeUser = async () => {
  try {
    const {id} = jwtDecode(getToken());
    return id;
  } catch (e) {
    return null;
  }
};

export default activeUser;