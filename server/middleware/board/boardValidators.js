const { check } = require('express-validator');
const Board = require('../../models/boardModel');

// Validation for title and columns
const addBoardValidator = [
	check('name').not().isEmpty().withMessage('Name cannot be empty'),
	check('columns').not().isEmpty().withMessage('Columns cannot be empty'),

	// check if board exists
	check('name').custom(async (name, { req }) => {
		const board = await Board.findOne({
			name,
			user: req.user.id,
		});
		if (board) {
			throw new Error('Board already exists');
		}
	}),
];

// Update board validation
const updateBoardValidator = [
	check('name').not().isEmpty().withMessage('Name cannot be empty'),
	check('columns').not().isEmpty().withMessage('Columns cannot be empty'),
];

module.exports = { addBoardValidator, updateBoardValidator };
