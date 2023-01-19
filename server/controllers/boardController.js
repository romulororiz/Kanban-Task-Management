const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Board = require('../models/boardModel');
const Column = require('../models/columnModel');
const Task = require('../models/taskModel');
const { validationResult } = require('express-validator');

// @route   GET api/boards
// @desc    Get all boards
// @access  Private
const getBoards = asyncHandler(async (req, res) => {
	try {
		// Get all boards for user
		const boards = await Board.find({ user: req.user.id }).populate({
			path: 'columns',
			model: 'Column',
		});

		res.status(200).json(boards);
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
});

const createBoard = asyncHandler(async (req, res) => {
	// Check for validation errors from middleware
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { name, columns } = req.body;

	try {
		// Create a new board with a columns array
		const board = new Board({
			name,
			user: req.user.id,
		});

		// Add columns to board
		for (let i = 0; i < columns.length; i++) {
			const column = new Column({
				name: columns[i].name,
				board: board._id,
			});

			board.columns.push(column);
			await column.save();
		}

		const createdBoard = await board.save();
		res.status(201).json(createdBoard);
	} catch (error) {
		res.status(400);
		throw new Error(error);
	}
});

// @route   PUT api/boards/:id
// @desc    Update a board
// @access  Private
const updateBoard = asyncHandler(async (req, res) => {
	// Check for validation errors from middleware
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { name, columns } = req.body;

	// check if user owns board
	const board = await Board.findById(req.params.id);

	if (board.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Not authorized');
	}

	try {
		const board = await Board.findById(req.params.id);

		if (board) {
			board.name = name;
			board.columns = columns.map(column => {
				return new Column({
					name: column.name,
				});
			});
			board.user = req.user.id;

			const updatedBoard = await board.save();
			res.status(201).json(updatedBoard);
		} else {
			res.status(404);
			throw new Error('Board not found');
		}
	} catch (error) {
		res.status(400);
		throw new Error(error);
	}
});

// @route   DELETE api/boards/:id
// @desc    Delete a board
// @access  Private
const deleteBoard = asyncHandler(async (req, res) => {
	const board = await Board.findById(req.params.id);

	// check if user owns board
	if (board.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Not authorized');
	}

	try {
		if (board) {
			await board.remove();
			res.status(200).json({ message: 'Board removed' });
		} else {
			res.status(404);
			throw new Error('Board not found');
		}
	} catch (error) {
		res.status(400);
		throw new Error(error);
	}
});

// @route   GET api/boards/:id/columns
// @desc    Get all columns for a board
// @access  Private
const getBoardColumns = asyncHandler(async (req, res) => {
	try {
		const board = await Board.findById(req.params.id);

		if (board) {
			const columns = await Column.find({ board: req.params.id });
			res.status(200).json(columns);
		} else {
			res.status(404);
			throw new Error('Board not found');
		}
	} catch (error) {
		res.status(400);
		throw new Error(error);
	}
});

module.exports = {
	getBoards,
	createBoard,
	updateBoard,
	deleteBoard,
	getBoardColumns,
};