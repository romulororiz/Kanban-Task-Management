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
			ref: 'Column',
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		column: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Column',
		},
		board: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Board',
		},
		subtasks: [
			{
				title: {
					type: String,
					required: true,
				},
				isCompleted: {
					type: Boolean,
					default: false,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
