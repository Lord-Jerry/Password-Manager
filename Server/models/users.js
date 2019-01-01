const mongoose = require('mongoose');
const schema = mongoose.Schema;
const users = new schema({
	username: {
		type: String,
		required: true,
		unique: true,
		maxlength: 20
	},
	password: {
		type: String,
		required: true,
		unique: false,
		maxlength: 70,
	},
	date_reg: {
		type: Date,
		required: true,
		unique: false,
		default: Date.now(),
	},
		
});
module.exports = mongoose.model('users',users);