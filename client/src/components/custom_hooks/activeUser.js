import jwtDecode from "jwt-decode";
import getToken from "./getToken";

const activeUser = async () => {
	try {
		const user = jwtDecode(getToken());
		return user;
	} catch (e) {
		return null;
	}
};

export default activeUser;