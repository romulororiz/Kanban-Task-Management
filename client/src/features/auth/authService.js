import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = '/api/users';

// Register a new user
const registerUser = async userData => {
	const response = await axios.post(`${API_URL}/register`, userData);

	if (response.data) {
		Cookies.set('user', JSON.stringify(response.data));
	}

	return response.data;
};

// Login user
const loginUser = async userData => {
	const response = await axios.post(`${API_URL}/login`, userData);

	if (response.data) {
		Cookies.set('user', JSON.stringify(response.data));
	}

	return response.data;
};

// Logout user
const logout = async () => {
	Cookies.remove('user');
};

const authService = {
	registerUser,
	loginUser,
	logout,
};

export default authService;
