const express = require('express');
const router = express.Router();
const {
	createColumn,
	deleteColumn,
	updateColumn,
	getBoardColumns,
	getColumnById,
} = require('../controllers/columnController');
const { columnValidator } = require('../middleware/board/boardValidators');
const protectRoute = require('../middleware/auth/authMiddleware');

// COLUMN ROUTES
// @route DELETE api/columns/:boardId/deleteAll
// @desc Delete all columns and tasks for a board
// @access Private
router.route('/:id/deleteAll').delete(protectRoute, deleteColumn);

// @route   POST api/columns/:id/create
// @desc    Create a column
// @access  Private
router.route('/:id/create').post(protectRoute, columnValidator, createColumn);

// @route   GET api/columns/:boardId
// @desc    Get all columns for a board
// @access  Private
router.route('/board/:id').get(protectRoute, getBoardColumns);

// @route   GET api/columns/:columnId
// @desc    Get a column
// @access  Private
router.route('/:columnId').get(protectRoute, getColumnById);

// @route   DELETE api/columns/:id
// @desc    Delete a column
// @access  Private
router.route('/:id').delete(protectRoute, deleteColumn);

// @route PUT api/columns/:id
// @desc Update a column
// @access Private
router.route('/:id').put(protectRoute, columnValidator, updateColumn);

module.exports = router;
