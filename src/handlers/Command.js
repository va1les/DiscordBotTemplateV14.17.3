const { readdir } = require("fs/promises");
const path = require("path");

module.exports = async (client) => {
	const commandsBasePath = path.join(__dirname, "../commands");

	for (const module of await readdir(commandsBasePath)) {
		const modulePath = path.join(commandsBasePath, module);
		const commandFiles = await readdir(modulePath);

		for (const commandFile of commandFiles) {
			if (!commandFile.endsWith('.js')) continue;
			try {
				const commandPath = path.join(modulePath, commandFile);

				const command = require(commandPath);

				command.folder = module;

				if (!command.options) command.options = {};
				command.options.bot_permissions = command.options.bot_permissions || ["ViewChannel", "SendMessages"];
				command.options.DM = command.options.DM ?? false;
				command.options.cooldown = command.options.cooldown ?? 10;
				command.options.ownerOnly = command.options.ownerOnly ?? false;
				command.options.devGuildOnly = command.options.devGuildOnly ?? false;

				client.commands.set(command.data.name, command);
			} catch (error) {
				console.log(error)
				console.error(`[CommandHandler][${module}] Error loading a command from a file ${commandFile}: ${error.message}`.red.bold);
			};
		};
	};
};
