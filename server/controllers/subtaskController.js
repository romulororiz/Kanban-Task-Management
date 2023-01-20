const asyncHandler = require('express-async-handler');
const Column = require('../models/columnModel');
const Task = require('../models/taskModel');
const { validationResult } = require('express-validator');
const Subtask = require('../models/subtaskModel');

// @route   GET api/subtasks/:taskId
// @desc    Get subtasks from a task
// @access  Private
const getSubtasks = asyncHandler(async (req, res) => {
	// check if task user id matches the user id
	const task = await Task.findById(req.params.id);

	if (task.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Not authorized');
	}

	try {
		// Get all subtasks for that task
		const subtasks = await Subtask.find({ task: req.params.id });
		res.status(200).json(subtasks);
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
});

// @route   POST api/subtasks/:id/create
// @desc    Create a subtask
// @access  Private
const createSubtask = asyncHandler(async (req, res) => {
	// Validate request
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { title, isCompleted } = req.body;

	// check if task exists
	const task = await Task.findById(req.params.id);
	if (!task) {
		res.status(400);
		throw new Error('Task not found');
	}

	// check if task user id matches the user id
	if (task.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Not authorized');
	}

	try {
		const subtask = await Subtask.create({
			title,
			isCompleted,
			task: req.params.id,
		});

		// Update task subtasks array
		task.subtasks.push(subtask._id);
		await task.save();

		// Return subtask
		res.status(201).json(subtask);
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
});

// @route   PUT api/subtasks/:id
// @desc    Update a subtask
// @access  Private
const updateSubtask = asyncHandler(async (req, res) => {
	// Validate request
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { title, isCompleted } = req.body;

	// check if subtask exists
	const subtask = await Subtask.findById(req.params.id);
	if (!subtask) {
		res.status(400);
		throw new Error('Subtask not found');
	}

	// check if task parents user id matches the user id
	const task = await Task.findById(subtask.task);
	if (task.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Not authorized');
	}

	try {
		const updatedSubtask = await Subtask.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					title,
					isCompleted,
				},
			},
			{ new: true }
		);

		// Return subtask
		res.status(200).json(updatedSubtask);
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
});

// @route   DELETE api/subtasks/:id
// @desc    Delete a subtask
// @access  Private
const deleteSubtask = asyncHandler(async (req, res) => {
	// check if subtask exists
	const subtask = await Subtask.findById(req.params.id);
	if (!subtask) {
		res.status(400);
		throw new Error('Subtask not found');
	}

	// check if task parents user id matches the user id
	const task = await Task.findById(subtask.task);
	if (task.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error('Not authorized');
	}

	try {
		// Delete subtask
		await subtask.remove();

		// Update task subtasks array
		task.subtasks = task.subtasks.filter(
			subtaskId => subtaskId.toString() !== req.params.id
		);
		await task.save();

		res.status(200).json({ msg: 'Subtask deleted' });
	} catch (error) {
		res.status(500);
		throw new Error(error);
	}
});

module.exports = {
	getSubtasks,
	updateSubtask,
	createSubtask,
	deleteSubtask,
};
