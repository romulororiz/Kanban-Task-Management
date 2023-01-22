const { check } = require('express-validator');
const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');

// Validation for email and password
const validateEmail = [
	check('email')
		.normalizeEmail()
		.isEmail()
		.withMessage('Please enter a valid email address'),
];
const validatePassword = [
	check('password')
		.isLength({ min: 6, max: 15 })
		.withMessage('Password should be between 6 to 15 chars long')
		.matches(/\d/)
		.withMessage('Password must contain a number')
		.matches(/[!@#$%^&*(),.?":{}|<>]/)
		.withMessage('Password must contain a special character'),

	check('confirmPassword')
		.custom((confirmPassword, { req }) => {
			if (confirmPassword !== req.body.password) {
				throw new Error('Passwords do not match');
			}
			return true;
		})
		.isLength({ min: 6, max: 15 })
		.withMessage('Password should be between 6 to 15 chars long'),
];

// Validation for user registration
// Check first name, last name, email, and password
const validateRegistration = [
	// Check first name
	check('firstName')
		.isLength({ min: 2 })
		.withMessage('First name must be at least 2 chars long'),

	// Check last name
	check('lastName')
		.isLength({ min: 2 })
		.withMessage('Last name must be at least 2 chars long')
		.not()
		.isEmpty({ ignore_whitespace: true })
		.withMessage('Last name cannot be empty'),

	validateEmail,
	check('email').custom(async email => {
		const user = await User.findOne({
			email,
		});
		if (user) {
			throw new Error('User already exists');
		}
	}),
	validatePassword,
];

// Validation for user login
// Check email and password
const validateLogin = [
	validateEmail,
	check('email').custom(async (email, { req }) => {
		const user = await User.findOne({
			email,
		});
		if (!user) {
			throw new Error('User does not exist');
		}
		const isMatch = await bcrypt.compare(req.body.password, user.password);
		if (!isMatch) {
			throw new Error('Invalid credentials');
		}
	}),

	validatePassword,
];

module.exports = { validateRegistration, validateLogin };
