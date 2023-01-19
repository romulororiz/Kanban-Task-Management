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
				name: {
					type: String,
					required: true,
				},
				tasks: [
					{
						type: mongoose.Schema.Types.ObjectId,
						ref: 'Task',
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
								title: {
									type: String,
									required: true,
								},
								isCompleted: {
									type: Boolean,
									required: true,
								},
							},
						],
					},
				],
			},
		],
	},
	{
		timestamps: true,
	}
);

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
