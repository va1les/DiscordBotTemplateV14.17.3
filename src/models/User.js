const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	gid: { type: String, required: true },
	uid: { type: String, required: true },
	bio: { type: String, default: null },
});

module.exports = mongoose.model('User', UserSchema);