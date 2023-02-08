const { check } = require('express-validator');

// Validation for title and columns
const boardValidator = [
	check('name').not().isEmpty().withMessage('cannot be empty'),
	check('name')
		.isLength({ max: 16 })
		.withMessage('Name should be less than 16 characters'),
];

// Add Column validation
const columnValidator = [boardValidator];

// add a task validation
const taskValidator = [
	check('title').not().isEmpty().withMessage('cannot be empty'),
	check('description').not().isEmpty().withMessage('cannot be empty'),
];

// add a subtask validation
const subtaskValidator = [
	check('title').not().isEmpty().withMessage('cannot be empty'),
];

module.exports = {
	boardValidator,
	columnValidator,
	taskValidator,
	subtaskValidator,
};
