const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
		subtasks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Subtask',
			},
		],
	},
	{
		timestamps: true,
	}
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
