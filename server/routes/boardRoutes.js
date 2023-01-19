const express = require('express');
const router = express.Router();
const {
	getBoards,
	createBoard,
	updateBoard,
} = require('../controllers/boardController');
const {
	addBoardValidator,
	updateBoardValidator,
} = require('../middleware/board/boardValidators');
const protectRoute = require('../middleware/auth/authMiddleware');

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

module.exports = router;
