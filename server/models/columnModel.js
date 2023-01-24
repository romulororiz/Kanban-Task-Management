const mongoose = require('mongoose');
const Task = require('./taskModel');

const columnSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		board: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Board',
		},
		color: {
			type: String,
			required: true,
		},
		tasks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Task',
			},
		],
	},
	{
		timestamps: true,
	}
);

// Delete all tasks when a within the column
columnSchema.pre('remove', async function (next) {
	try {
		await this.model('Task').deleteMany({ column: this._id });
		next();
	} catch (err) {
		next(err);
	}
});

// Update all tasks when a column is updated
columnSchema.pre('findOneAndUpdate', async function (next) {
	const update = this.getUpdate();
	if (update.name) {
		const tasks = await Task.find({ column: this._conditions._id });
		tasks.forEach(async task => {
			task.status = update.name;
			await task.save();
		});
	}
	next();
});

const Column = mongoose.model('Column', columnSchema);
module.exports = Column;
