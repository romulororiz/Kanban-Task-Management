const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const asyncHandler = require('express-async-handler');
const { logoutUser } = require('../../controllers/userController');
const checkTokenExpiration = require('../../utils/checkTokenExpire');

const protectRoute = asyncHandler(async (req, res, next) => {
	// Get user token from cookie
	const token = req.cookies.access_token;

	// Check if token exists
	if (!token) {
		res.status(401);
		throw new Error('Not authorized, no token');
	}

	// Check if token is expired
	if (checkTokenExpiration(token)) {
		logoutUser();
		res.status(401);
		throw new Error('Not authorized, token expired');
	}

	// verify token
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Find user by id
		const user = await User.findById(decoded.id);

		// Check if user exists
		if (!user) {
			res.status(401);
			throw new Error('Not authorized, no user');
		}

		// Attach user to request
		req.user = user;

		next();
	} catch (error) {
		res.status(401);
		throw new Error('Not authorized, invalid token');
	}
});

module.exports = protectRoute;
