const mongoose = require('mongoose');

const subTaskSchema = new mongoose.Schema({
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

const SubTask = mongoose.model('SubTask', subTaskSchema);
module.exports = SubTask;
