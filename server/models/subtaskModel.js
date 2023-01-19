const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	isCompleted: {
		type: Boolean,
		required: true,
	},
	task: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Task',
	},
});

const SubTask = mongoose.model('Subtask', subtaskSchema);
module.exports = SubTask;