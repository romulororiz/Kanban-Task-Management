const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const {
	validateRegistration,
	validateLogin,
} = require('../middleware/userValidators');
const router = express.Router();

router
	.post('/register', validateRegistration, registerUser)
	.post('/login', validateLogin, loginUser);

module.exports = router;
