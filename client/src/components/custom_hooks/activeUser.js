import jwtDecode from "jwt-decode";
import getToken from "./getToken";

const activeUser = async () => {
	try {
		const user_id = jwtDecode(getToken());
		return user_id.id;
	} catch (e) {
		return null;
	}
};

export default activeUser;