const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Board = require('../models/boardModel');
const Column = require('../models/columnModel');
const Task = require('../models/taskModel');
const { validationResult } = require('express-validator');
const generateRandomColor = require('../middleware/board/generateRandomColor');

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

	const { name, color } = req.body;

	try {
		// Create a new column
		const column = new Column({
			name,
			color: color ? color : generateRandomColor(),
			board: req.params.id,
		});

		// Save column to database
		const savedColumn = await column.save();

		// Add column to board
		board.columns.push(savedColumn._id);
		await board.save();

		res.status(200).json(savedColumn);
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
});

// @route GET api/columns/board/:boardId
// @desc Get all columns for a board
// @access Private
const getBoardColumns = asyncHandler(async (req, res) => {
	// check if user owns board and populate columns
	const board = await Board.findById(req.params.id).populate('columns');

	// check if board exists
	if (!board) {
		res.status(404);
		throw new Error('Board not found');
	}

	if (board.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Not authorized');
	}

	try {
		// Get all columns for board and populate tasks
		const columns = await Column.find({ board: req.params.id }).populate({
			path: 'tasks',
			model: 'Task',
		});

		res.status(200).json(columns);
	} catch (error) {
		res.status(400);
		throw new Error(error);
	}
});

// @route GET api/columns/:id
// @desc Get a column by id
// @access Private
const getColumnById = asyncHandler(async (req, res) => {
	// Find column by id
	const column = await Column.findById(req.params.columnId);

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
	try {
		res.status(200).json(column);
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
	try {
		await column.remove();
		res.status(200).json(column);
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

	const { name, color } = req.body;

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

	try {
		const updatedColumn = await Column.findByIdAndUpdate(
			req.params.id,
			{ name, color },
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

// @Route DELETE api/columns/:boardId/deleteAll
// @Desc Delete all columns for a board
// @Access Private
const deleteAllColumns = asyncHandler(async (req, res) => {
	const { columnsIds } = req.body;

	try {
		// Find board by id
		const board = await Board.findById(req.params.id);

		// Check if board exists
		if (!board) {
			res.status(404);
			throw new Error('Board not found');
		}

		// Check if user owns the board
		const user = await User.findById(req.user.id);

		if (board.user.toString() !== user._id.toString()) {
			res.status(401);
			throw new Error('Not authorized');
		}

		// Delete all columns for board
		await Column.deleteMany({ board: req.params.id, _id: { $in: columnsIds } });
		res.status(200).json({ message: 'Columns removed' });

		// Remove all columns from board
		board.columns = [];
		await board.save();
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
});

module.exports = {
	createColumn,
	deleteColumn,
	updateColumn,
	getBoardColumns,
	getColumnById,
	deleteAllColumns,
};
