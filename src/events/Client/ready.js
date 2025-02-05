const { Events } = require("discord.js");

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`[${client.functions.getById(`time.msk`)}] Ready! Logged in as ${client.user.tag}`.green.bold);
	},
};
