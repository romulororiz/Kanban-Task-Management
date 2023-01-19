const User = require('../models/userModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const generateToken = require('../middleware/generateToken');

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
	const { firstName, lastName, email, password } = req.body;

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	try {
		// Create new user
		const newUser = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});

		// Return new user
		res.status(201).json({
			_id: newUser._id,
			firstName: newUser.firstName,
			lastName: newUser.lastName,
			email: newUser.email,
			boards: newUser.boards,
			token: generateToken(newUser._id),
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

		res.status(200).json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			boards: user.boards,
			token: generateToken(user._id),
		});
	} catch (error) {
		res.status(500);
		throw new Error('Server error');
	}
});

module.exports = {
	registerUser,
	loginUser,
};
