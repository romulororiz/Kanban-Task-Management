const asyncHandler = require('express-async-handler');
const Board = require('../models/boardModel');
const { validationResult } = require('express-validator');

// @route   GET api/boards
// @desc    Get all boards
// @access  Private
const getBoards = asyncHandler(async (req, res) => {
	try {
		// Get all boards for user
		const boards = await Board.find({ user: req.user.id }).populate({
			path: 'columns',
			populate: {
				path: 'tasks',
				model: 'Task',
			},
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

	const { name } = req.body;

	try {
		// create new board and save columnsIds to columns Array
		const board = new Board({
			user: req.user.id,
			name,
		});
		// Save board to database
		const createdBoard = await board.save();
		res.status(201).json(createdBoard);
	} catch (error) {
		res.status(400);
		throw new Error(error);
	}
});

// @route   GET api/boards/:id
// @desc    Get a board by id
// @access  Private
const getBoard = asyncHandler(async (req, res) => {
	// check if user owns board
	const board = await Board.findById(req.params.id);

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
		const board = await Board.findById(req.params.id).populate({
			path: 'columns',
			populate: {
				path: 'tasks',
				model: 'Task',
			},
		});

		res.status(200).json(board);
	} catch (error) {
		res.status(500);
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

	// check if user owns board
	const board = await Board.findById(req.params.id);

	const { name } = req.body;

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
		board.name = name;
		board.user = req.user.id;

		const updatedBoard = await board.save();
		res.status(201).json(updatedBoard);
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

	// check if board exists
	if (!board) {
		res.status(404);
		throw new Error('Board not found');
	}

	// check if user owns board
	if (board.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Not authorized');
	}

	try {
		await board.remove();
		res.status(200).json(board);
	} catch (error) {
		res.status(400);
		throw new Error(error);
	}
});

module.exports = {
	getBoards,
	getBoard,
	createBoard,
	updateBoard,
	deleteBoard,
};
