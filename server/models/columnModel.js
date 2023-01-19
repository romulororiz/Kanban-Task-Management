const mongoose = require('mongoose');

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

// Delete all tasks when a column is deleted
columnSchema.pre('remove', async function (next) {
	try {
		await this.model('Task').deleteMany({ column: this._id });
		next();
	} catch (err) {
		next(err);
	}
});

const Column = mongoose.model('Column', columnSchema);
module.exports = Column;
