const { check } = require('express-validator');

// Validation for title and columns
const boardValidator = [
	check('name').not().isEmpty().withMessage('Name cannot be empty'),
];

// Add Column validation
const columnValidator = [
	check('name').not().isEmpty().withMessage('Name cannot be empty'),
	// length of name should be less than 10
	check('name')
		.isLength({ max: 10 })
		.withMessage('Name should be less than 10 characters'),
];

// add a task validation
const taskValidator = [
	check('title').not().isEmpty().withMessage('Title cannot be empty'),
	check('description')
		.not()
		.isEmpty()
		.withMessage('Description cannot be empty'),
];

// add a subtask validation
const subtaskValidator = [
	check('title').not().isEmpty().withMessage('Title cannot be empty'),
	check('isCompleted')
		.not()
		.isEmpty()
		.withMessage('isCompleted cannot be empty'),
];

module.exports = {
	boardValidator,
	columnValidator,
	taskValidator,
	subtaskValidator,
};
