const mongoose = require('../db/connection');

// Data template for Users removing the email from view in the database.  Also removing the password from being passed in requests.  
const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			select: false,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			// ret is the returned Mongoose document
			transform: (_doc, ret) => {
				delete ret.password;
				return ret;
			},
		},
	}
);

const User = mongoose.model('User', userSchema);
module.exports = User;
