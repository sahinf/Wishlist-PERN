const jwt = require("jsonwebtoken");
require("dotenv").config();
// const { SECRET_KEY_FOR_BCRYPT } = process.env;
const  SECRET_KEY_FOR_BCRYPT  = 'CEE83662D9832BC1BF966AFC7CC9CB2FD34D98EB011DB586AD83F242FDF30940';

/**
 * 
 * @param {*} user (can have anything like id, password, email, name)
 * @returns token for user's login session
 */
module.exports = async (user) => {
	const payload = {
		...user,
	};
	return await jwt.sign(payload, SECRET_KEY_FOR_BCRYPT, {
		expiresIn: "2 days",
	});
};

