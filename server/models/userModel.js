const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

// On user delete, cascade delete all columns and tasks
userSchema.pre('remove', async function (next) {
	try {
		// Find all boards associated with the user
		const boards = await this.model('Board').find({ user: this._id });

		// Delete all boards associated with the user
		boards.forEach(async board => {
			await board.remove();
		});

		next();
	} catch (error) {
		next(error);
	}
});

const User = mongoose.model('User', userSchema);
module.exports = User;
