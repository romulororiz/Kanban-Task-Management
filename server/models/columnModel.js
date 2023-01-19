const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	tasks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Task',
		},
	],
});

const Column = mongoose.model('Column', columnSchema);
module.exports = Column;
