const express = require('express');
const router = express.Router();
const {
	createColumn,
	deleteColumn,
	updateColumn,
	getBoardColumns,
} = require('../controllers/columnController');
const { columnValidator } = require('../middleware/board/boardValidators');
const protectRoute = require('../middleware/auth/authMiddleware');

// COLUMN ROUTES
// @route   POST api/columns/:id/create
// @desc    Create a column
// @access  Private
router.route('/:id/create').post(protectRoute, columnValidator, createColumn);

// @route   GET api/columns/:boardId
// @desc    Get all columns for a board
// @access  Private
router.route('/:id').get(protectRoute, getBoardColumns);

// @route   DELETE api/columns/:id
// @desc    Delete a column
// @access  Private
router.route('/:id').delete(protectRoute, deleteColumn);
module.exports = router;

// @route PUT api/columns/:id
// @desc Update a column
// @access Private
router.route('/:id').put(protectRoute, columnValidator, updateColumn);
