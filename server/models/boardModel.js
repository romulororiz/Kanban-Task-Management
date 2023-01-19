const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
		},
		columns: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Column',
			},
		],
	},
	{
		timestamps: true,
	}
);

// Delete all columns and tasks when a board is deleted
boardSchema.pre('remove', async function (next) {
	try {
		await this.model('Column').deleteMany({ board: this._id });
		await this.model('Task').deleteMany({ column: { $in: this.columns } });
		next();
	} catch (err) {
		next(err);
	}
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
