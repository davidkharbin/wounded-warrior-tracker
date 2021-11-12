const mongoose = require('mongoose');

// create a new schema
const Schema = mongoose.Schema;

let EntriesSchema = new Schema({
	user_name: String,
	user_email: String,
	user_password: String
});

// create a model
let Entry = mongoose.model('Entry', EntriesSchema);

// GET document based on name
const getEntry = (name, cb) => {
	Entry.findOne({ user_name: name }, (error, entry) => {
		if (error) {
			cb(error, null);
		} else {
			cb(null, entry);
		}
	}
	)
};

module.exports = {
	getEntry
}
