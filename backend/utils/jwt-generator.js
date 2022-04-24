const jwt = require("jsonwebtoken");
require("dotenv").config();
// const { SECRET_KEY_FOR_BCRYPT } = process.env;
const  SECRET_KEY_FOR_BCRYPT  = 'CEE83662D9832BC1BF966AFC7CC9CB2FD34D98EB011DB586AD83F242FDF30940';

module.exports = async (user) => {
	const payload = {
		...user,
	};
  console.log(JSON.stringify(user))
  console.log(JSON.stringify(SECRET_KEY_FOR_BCRYPT))
	return await jwt.sign(payload, SECRET_KEY_FOR_BCRYPT, {
		expiresIn: "2 days",
	});
};

