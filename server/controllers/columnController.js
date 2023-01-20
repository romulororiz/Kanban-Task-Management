const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Board = require('../models/boardModel');
const Column = require('../models/columnModel');
const { validationResult } = require('express-validator');
const Task = require('../models/taskModel');

// @route POST api/columns
// @desc Create a column
// @access Private
const createColumn = asyncHandler(async (req, res) => {
	// Check for validation errors from middleware
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	// check if board exists
	const board = await Board.findById(req.params.id);
	if (!board) {
		res.status(404);
		throw new Error('Board not found');
	}

	const { name } = req.body;

	try {
		// Create a new column
		const updatedColumn = await Column.findByIdAndUpdate(
			req.params.id,
			{ $set: name },
			{ new: true }
		);

		// Add column to board
		board.columns.push(updatedColumn._id);
		await board.save();

		res.status(200).json(updatedColumn);
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
});

// Delete a column
// @route DELETE api/columns/:id
// @desc Delete a column
// @access Private
const deleteColumn = asyncHandler(async (req, res) => {
	try {
		// Find column by id
		const column = await Column.findById(req.params.id);

		// Check if column exists
		if (!column) {
			res.status(404);
			throw new Error('Column not found');
		}

		// Check if user owns the board that the column is on
		const board = await Board.findById(column.board);
		const user = await User.findById(req.user.id);

		if (board.user.toString() !== user._id.toString()) {
			res.status(401);
			throw new Error('Not authorized');
		}

		await column.remove();
		res.status(200).json({ message: 'Column removed' });
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
});

// @route PUT api/columns/:id
// @desc Update a column
// @access Private
const updateColumn = asyncHandler(async (req, res) => {
	// Check for validation errors from middleware
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { name } = req.body;

	try {
		// Find column by id
		const column = await Column.findById(req.params.id);

		// Check if column exists
		if (!column) {
			res.status(404);
			throw new Error('Column not found');
		}

		// Check if user owns the board that the column is on
		const board = await Board.findById(column.board);
		const user = await User.findById(req.user.id);

		if (board.user.toString() !== user._id.toString()) {
			res.status(401);
			throw new Error('Not authorized');
		}

		const updatedColumn = await Column.findByIdAndUpdate(
			req.params.id,
			{ name },
			{ new: true }
		);

		// Update status of all tasks associated with the column
		await Task.updateMany(
			{ column: req.params.id },
			{ status: updatedColumn.name }
		);

		res.status(200).json(updatedColumn);
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
});

module.exports = { createColumn, deleteColumn, updateColumn };
