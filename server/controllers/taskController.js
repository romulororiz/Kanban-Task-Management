const asyncHandler = require('express-async-handler');
const Column = require('../models/columnModel');
const Task = require('../models/taskModel');
const { validationResult } = require('express-validator');

// @route   GET api/tasks/:boardId
// @desc    Get all tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
	try {
		const { boardId } = req.params;

		const tasks = await Task.find({ board: boardId });

		// check if tasks exist
		if (!tasks) {
			res.status(404);
			throw new Error('No tasks found');
		}

		res.status(200).json(tasks);
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
});

// @route   GET api/tasks/:id
// @desc    Get a task by id
// @access  Private
const getTaskById = asyncHandler(async (req, res) => {
	// Get task by id
	const task = await Task.findById(req.params.id);

	// Check if task exists
	if (!task) {
		res.status(404);
		throw new Error('Task not found');
	}

	// Check if task belongs to user
	if (task.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Not authorized');
	}

	try {
		res.status(200).json(task);
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
});

// @route   POST api/tasks/columnId/create
// @desc    Create a task
// @access  Private
const createTask = asyncHandler(async (req, res) => {
	// Check for validation errors from middleware
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { title, description, subtasks } = req.body;

	const { columnId } = req.params;

	// Retrieve column from column id
	const column = await Column.findById(columnId);

	// check if column exists
	if (!column) {
		res.status(400);
		throw new Error('Column not found');
	}

	try {
		// Create a new task inside the columns array
		const task = new Task({
			title,
			description,
			column: column._id,
			status: column.name,
			board: column.board,
			subtasks,
			user: req.user.id,
		});

		// Add task to column
		column.tasks.push(task);
		await column.save();

		// Save task to database
		const createdTask = await task.save();
		res.status(201).json(createdTask);
	} catch (error) {
		res.status(400);
		throw new Error(error);
	}
});

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
	// Find task by id
	const task = await Task.findById(req.params.id);

	// Check if task exists
	if (!task) {
		res.status(404);
		throw new Error('Task not found');
	}

	// find column by id
	const column = await Column.findById(task.column);

	// Check if user owns task
	if (task.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Not authorized');
	}

	try {
		// Delete task
		await task.remove();

		// Remove the reference to the task in the column
		column.tasks.pull(task._id);
		await column.save();

		res.status(200).json(task);
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
});

// @route PUT api/tasks/:id
// @desc Update a task
// @access Private
const updateTask = asyncHandler(async (req, res) => {
	const { title, description, status, subtasks } = req.body;

	// Find task by id
	const task = await Task.findById(req.params.id);

	// Check if task exists
	if (!task) {
		res.status(404);
		throw new Error('Task not found');
	}

	// Check if user owns task
	if (task.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Not authorized');
	}
	try {
		// Update task
		const updatedTask = await Task.findByIdAndUpdate(
			req.params.id,
			{
				title,
				description,
				status,
				column: status,
				subtasks,
			},
			{ new: true }
		);

		res.status(200).json(updatedTask);
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
});
module.exports = {
	getTasks,
	getTaskById,
	createTask,
	deleteTask,
	updateTask,
};
