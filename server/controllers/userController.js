const User = require('../models/userModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const generateToken = require('../middleware/auth/generateToken');

// @route   POST api/users/register
// @desc    Register a new user
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	// Check for validation errors from middleware
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	// Destructure request body
	const { firstName, lastName, email, password, confirmPassword } = req.body;

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// check if password and confirm password match
	if (password !== confirmPassword) {
		res.status(400);
		throw new Error('Passwords do not match');
	}

	try {
		// create new user
		const newUser = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});

		// create a new token and save it to a cookie
		const token = generateToken(newUser._id);

		// Set cookie options for 30 days
		const options = {
			maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
			httpOnly: true,
		};

		// Set cookie
		res.cookie('access_token', token, options);

		res.status(201).json({
			_id: newUser._id,
			firstName: newUser.firstName,
			lastName: newUser.lastName,
			email: newUser.email,
			boards: newUser.boards,
		});
	} catch (error) {
		res.status(500);
		throw new Error('Server error');
	}
});

// @route   POST api/users/login
// @desc    Login a user
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
	// Check for validation errors from middleware
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	// Destructure request body
	const { email } = req.body;

	try {
		const user = await User.findOne({
			email,
		});

		// create a new token and save it to a cookie
		const token = generateToken(user._id);

		// Set cookie options
		const options = {
			maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
			httpOnly: true,
		};

		// Set cookie
		res.cookie('access_token', token, options);

		// Return user
		res.status(200).json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			boards: user.boards,
		});
	} catch (error) {
		res.status(500);
		throw new Error('Server error');
	}
});

// @route   GET api/users/logout
// @desc    Logout a user
// @access  Private
// todo - handle clearing local storage upon cookie expiration

const logoutUser = asyncHandler(async (req, res) => {
	const options = {
		maxAge: 0,
	};
	res.cookie('access_token', '', options);

	res.status(200).json({ message: 'User logged out' });
});

module.exports = {
	registerUser,
	loginUser,
	logoutUser,
};
