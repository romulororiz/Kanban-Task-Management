const express = require('express');
const router = express.Router();
const {
	getBoards,
	createBoard,
	updateBoard,
	deleteBoard,
	getBoard,
} = require('../controllers/boardController');
const { boardValidator } = require('../middleware/board/boardValidators');
const protectRoute = require('../middleware/auth/authMiddleware');

// BOARD ROUTES
// @route   GET api/boards
// @desc    Get all boards
// @access  Private
router.route('/').get(protectRoute, getBoards);

// @route   GET api/boards/:id
// @desc    Get a board
// @access  Private
router.route('/:id').get(protectRoute, getBoard);

// @route   POST api/boards/create
// @desc    Create a board
// @access  Private
router.route('/create').post(protectRoute, boardValidator, createBoard);

// @route   PUT api/boards/:id
// @desc    Update a board
// @access  Private
router.route('/:id').put(protectRoute, boardValidator, updateBoard);

// @route   DELETE api/boards/:id
// @desc    Delete a board
// @access  Private
router.route('/:id').delete(protectRoute, deleteBoard);

module.exports = router;
