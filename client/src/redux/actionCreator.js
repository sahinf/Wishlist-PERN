import axios from "axios";
import { wishlistUser } from "../URLs";
import activeUser from "../components/custom_hooks/activeUser";
import jwtToken from "../components/custom_hooks/getToken";

const gettingItems = () => {
	return async function (dispatch) {
		try {
			const { id } = await activeUser();
			let url = wishlistUser(id);
      //* Get request to wishlist of user
			const res = await axios.get(url, {
				headers: {
					token: jwtToken(),
				},
			});

			dispatch({ type: "GETITEM", res });
		} catch (e) {
			// console.log(e.response);
			dispatch({
				type: "NOTFOUNDITEM",
				msg: e.message,
			});
		}
	};
};

export { gettingItems };