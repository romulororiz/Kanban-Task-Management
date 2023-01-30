const express = require('express');
const router = express.Router();
const {
	getTasks,
	createTask,
	deleteTask,
	updateTask,
	getTaskById,
} = require('../controllers/taskController');
const { taskValidator } = require('../middleware/board/boardValidators');
const protectRoute = require('../middleware/auth/authMiddleware');

//TASK ROUTES
// @route   GET api/tasks/:boardId
// @desc    Get all tasks
// @access  Private
router.route('/board/:boardId').get(protectRoute, getTasks);

// @route   GET api/tasks/:id
// @desc    Get a task by id
// @access  Private
router.route('/:id').get(protectRoute, getTaskById);

// @route   POST api/tasks/:columnId/create
// @desc    Create a task
// @access  Private
router.route('/:columnId/create').post(protectRoute, taskValidator, createTask);

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
router.route('/:id').delete(protectRoute, deleteTask);

// @route   PUT api/tasks/:id
// @desc    Update a task
// @access  Private
router.route('/:id').put(protectRoute, taskValidator, updateTask);

module.exports = router;
