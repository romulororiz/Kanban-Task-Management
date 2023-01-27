const mongoose = require('mongoose');
const generateRandomColor = require('../middleware/board/generateRandomColor');

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

// Check if board is new and theres no columns, create default columns
boardSchema.pre('save', async function (next) {
	try {
		if (this.isNew && this.columns.length === 0) {
			const columns = ['To Do', 'In Progress', 'Done'].map(name => {
				return {
					name,
					board: this._id,
					color: generateRandomColor(),
				};
			});
			const newColumns = await this.model('Column').insertMany(columns);
			this.columns = newColumns.map(column => column._id);
		}
		next();
	} catch (err) {
		next(err);
	}
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
