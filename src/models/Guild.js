const mongoose = require("mongoose");

const GuildSchema = new mongoose.Schema({
	gid: { type: String, required: true },
});

module.exports = mongoose.model('Guild', GuildSchema);