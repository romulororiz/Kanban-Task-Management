const { check } = require('express-validator');
const Board = require('../../models/boardModel');

// Validation for title and columns
const boardValidator = [
	check('name').not().isEmpty().withMessage('Name cannot be empty'),
	check('columns').not().isEmpty().withMessage('Columns cannot be empty'),
];

// Add Column validation
const columnValidator = [
	check('name').not().isEmpty().withMessage('Name cannot be empty'),
	// length of name should be less than 10
	check('name')
		.isLength({ max: 10 })
		.withMessage('Name should be less than 10 characters'),
];

module.exports = {
	boardValidator,
	columnValidator,
};
