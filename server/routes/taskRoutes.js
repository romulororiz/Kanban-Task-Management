const express = require('express');
const router = express.Router();
const {
	getTasks,
	createTask,
	deleteTask,
} = require('../controllers/taskController');
const { taskValidator } = require('../middleware/board/boardValidators');
const protectRoute = require('../middleware/auth/authMiddleware');

//TASK ROUTES
// @route   GET api/tasks
// @desc    Get all tasks
// @access  Private
router.route('/').get(protectRoute, getTasks);

// @route   POST api/tasks/create
// @desc    Create a task
// @access  Private
router.route('/create').post(protectRoute, taskValidator, createTask);

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
router.route('/:id').delete(protectRoute, deleteTask);

module.exports = router;
