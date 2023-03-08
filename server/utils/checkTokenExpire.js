const jwt = require('jsonwebtoken');

const isTokenExpired = decoded => {
	const currentTime = Date.now() / 1000;
	return decoded.exp < currentTime;
};

const checkTokenExpiration = token => {
	if (!token) {
		return true;
	}
	const decoded = jwt.decode(token);
	return isTokenExpired(decoded);
};

module.exports = checkTokenExpiration;
