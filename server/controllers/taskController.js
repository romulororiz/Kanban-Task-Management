const asyncHandler = require('express-async-handler');
const Column = require('../models/columnModel');
const Task = require('../models/taskModel');
const { validationResult } = require('express-validator');
const Subtask = require('../models/subtaskModel');

// @route   GET api/tasks
// @desc    Get all tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
	try {
		// Get all tasks for that column checking the board user id
		const tasks = await Task.find({ user: req.user.id });
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
});

// @route   POST api/tasks/create
// @desc    Create a task
// @access  Private
const createTask = asyncHandler(async (req, res) => {
	// Check for validation errors from middleware
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { title, description, column } = req.body;

	// check if theres at least one column in the board before creating a task
	const columns = await Column.find({ board: req.params.id });
	if (columns.length === 0) {
		res.status(400);
		throw new Error(
			'Board must have at least one column before creating a task'
		);
	}

	// Retrieve column from column id
	const columnData = await Column.findById(column);

	// check if column exists
	if (!columnData) {
		res.status(400);
		throw new Error('Column not found');
	}

	try {
		// Create a new task inside the columns array
		const task = new Task({
			title,
			description,
			column: columnData._id,
			status: columnData.name,
			user: req.user.id,
		});

		// Add task to column
		columnData.tasks.push(task);
		await columnData.save();

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
	try {
		// Find task by id
		const task = await Task.findById(req.params.id);

		// find column by id
		const column = await Column.findById(task.column);

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

		// Find all subtasks associated with the task
		const subtasks = await Subtask.find({ task: task._id });

		// Delete all subtasks associated with the task
		subtasks.forEach(async subtask => {
			await subtask.remove();
		});

		// Delete task
		await task.remove();

		// Remove the reference to the task in the column
		column.tasks.pull(task._id);
		await column.save();

		res.status(200).json({ message: 'Task removed' });
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
});

// @route PUT api/tasks/:id
// @desc Update a task
// @access Private
const updateTask = asyncHandler(async (req, res) => {
	const { title, description, column } = req.body;

	try {
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

		// Update task
		const updatedTask = await Task.findByIdAndUpdate(
			req.params.id,
			{
				title,
				description,
				column,
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
	createTask,
	deleteTask,
	updateTask,
};
