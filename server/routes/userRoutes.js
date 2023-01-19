const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const {
	validateRegistration,
	validateLogin,
} = require('../middleware/auth/userValidators');
const router = express.Router();

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', validateRegistration, registerUser);

// @route   POST api/users/login
// @desc    Login a user
// @access  Public
router.post('/login', validateLogin, loginUser);

module.exports = router;
