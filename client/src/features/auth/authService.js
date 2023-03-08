import axios from 'axios';

const API_URL = '/api/users';

// Register a new user
const registerUser = async userData => {
	const response = await axios.post(`${API_URL}/register`, userData);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
};

// Login user
const loginUser = async userData => {
	const response = await axios.post(`${API_URL}/login`, userData);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
};

// Logout user
const logout = async () => {
	const response = await axios.get(`${API_URL}/logout`);

	if (response.data) {
		localStorage.removeItem('user');
	}

	return response.data;
};

const authService = {
	registerUser,
	loginUser,
	logout,
};

export default authService;
