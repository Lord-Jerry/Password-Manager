const mongoose = require('mongoose');
const schema = mongoose.Schema;
const details = new schema({
	user_id: {
		type: String,
		required: true,
		unique: false,
	},
	website: {
		type: String,
		required: true,
		unique: false,
	},
	username: {
		type: String,
		required: true,
		unique: false,
		default: 0,
	},
	Password: {
		type: String,
		required: true,
		unique: false,
	},
	date_created: {
		type: Date,
		required: true,
		unique: false,
		default: Date.now()
	}
})
module.exports = mongoose.model('details',details);