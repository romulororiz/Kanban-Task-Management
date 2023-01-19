const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
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
});

const Board = mongoose.model('Board', boardSchema);
module.exports = Board;
