const express = require('express');
const router = express.Router();
const {
	getSubtasks,
	createSubtask,
	updateSubtask,
	deleteSubtask,
} = require('../controllers/subtaskController');
const { subtaskValidator } = require('../middleware/board/boardValidators');
const protectRoute = require('../middleware/auth/authMiddleware');

//SUBTASK ROUTES
// @route   GET api/subtasks/:taskId
// @desc    Get subtasks from a task
// @access  Private
router.route('/:id').get(protectRoute, getSubtasks);

// @route   POST api/subtasks/:taskId/create
// @desc    Create a subtask
// @access  Private
router.route('/:id/create').post(protectRoute, subtaskValidator, createSubtask);

// @route   PUT api/subtasks/:id
// @desc    Update a subtask
// @access  Private
router.route('/:id').put(protectRoute, subtaskValidator, updateSubtask);

// @route   DELETE api/subtasks/:id
// @desc    Delete a subtask
// @access  Private
router.route('/:id').delete(protectRoute, deleteSubtask);

module.exports = router;
