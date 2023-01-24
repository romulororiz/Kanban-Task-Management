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
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Subtask',
			},
		],
	},
	{
		timestamps: true,
	}
);

// Delete all subtasks when a task is deleted
taskSchema.pre('remove', async function (next) {
	try {
		await this.model('Subtask').deleteMany({ task: this._id });
		next();
	} catch (err) {
		next(err);
	}
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
