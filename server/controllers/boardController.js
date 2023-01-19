const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Board = require('../models/boardModel');
const Column = require('../models/columnModel');
const Task = require('../models/taskModel');
const Subtask = require('../models/subtaskModel');
const { validationResult } = require('express-validator');

// @route   GET api/boards
// @desc    Get all boards
// @access  Private
const getBoards = asyncHandler(async (req, res) => {
	// get user id from req.user.id
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}

	try {
		// Get all boards for user
		const boards = await Board.find({ user: req.user.id });
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

	// get user id from req.user.id
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}

	try {
		const board = await Board.create({
			name,
			columns: columns.map(column => {
				return new Column({
					name: column.name,
				});
			}),
			user: req.user.id,
		});

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

	// get user id from req.user.id
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(404);
		throw new Error('User not found');
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

module.exports = {
	getBoards,
	createBoard,
	updateBoard,
};
