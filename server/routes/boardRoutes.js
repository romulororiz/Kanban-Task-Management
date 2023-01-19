const express = require('express');
const router = express.Router();
const {
	getBoards,
	createBoard,
	updateBoard,
	deleteBoard,
	getBoardColumns,
} = require('../controllers/boardController');
const {
	addBoardValidator,
	updateBoardValidator,
} = require('../middleware/board/boardValidators');
const protectRoute = require('../middleware/auth/authMiddleware');

// BOARD ROUTES
// @route   GET api/boards
// @desc    Get all boards
// @access  Private
router.route('/').get(protectRoute, getBoards);

// @route   POST api/boards/create
// @desc    Create a board
// @access  Private
router.route('/create').post(protectRoute, addBoardValidator, createBoard);

// @route   PUT api/boards/:id
// @desc    Update a board
// @access  Private
router.route('/:id').put(protectRoute, updateBoardValidator, updateBoard);

// @route   DELETE api/boards/:id
// @desc    Delete a board
// @access  Private
router.route('/:id').delete(protectRoute, deleteBoard);

// COLUMNS ROUTES
// @route   GET api/boards/:id/columns
// @desc    Get all columns for a board
// @access  Private
router.route('/:id/columns').get(protectRoute, getBoardColumns);

module.exports = router;
