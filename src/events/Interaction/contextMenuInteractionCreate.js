const { Events, Collection, MessageFlags } = require("discord.js");
const { developers } = require("../../../config.json");

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		const { client, guild, user } = interaction;

		if (!interaction.isContextMenuCommand()) return;

		if (interaction.isUserContextMenuCommand() || interaction.isMessageContextMenuCommand()) {
			try {
				const command = client.commands.get(interaction.commandName);

				if (!command) {
					return interaction.reply({ content: `${client.functions.getById(`emojis.error`)} Такой команды нет.`, flags: MessageFlags.Ephemeral }).catch();
				};

				if (command.options && command.options?.ownerOnly && !developers.includes(user.id)) {
					return interaction.reply({ content: `${client.functions.getById(`emojis.error`)} Эта команда недоступна для использования.`, flags: MessageFlags.Ephemeral }).catch();
				};

				if (command.options && command.options?.bot_permissions && !guild.members.me.permissions.has(command.options?.bot_permissions)) {
					const permsBot = command.options?.bot_permissions?.map(x => x).join(', ');

					return interaction.reply({ content: `${client.functions.getById(`emojis.error`)} Боту не хватает прав: ${permsBot}.`, flags: MessageFlags.Ephemeral });
				};

				const { cooldowns } = client;

				if (!cooldowns.has(interaction.commandName)) {
					cooldowns.set(interaction.commandName, new Collection());
				};

				const now = Date.now();
				const timestamps = cooldowns.get(interaction.commandName);
				const cooldownAmount = (command.options?.cooldown ?? 5) * 1000;

				if (timestamps.has(user.id)) {
					const expirationTime = timestamps.get(user.id) + cooldownAmount;

					if (now < expirationTime) {
						const expiredTimestamp = Math.round(expirationTime / 1000);

						return await client.functions.cooldownReply(interaction, expiredTimestamp);
					};
				};

				timestamps.set(user.id, now);
				setTimeout(() => timestamps.delete(user.id), cooldownAmount);

				await command.execute(interaction);
			} catch (error) {
				console.log(error);
				return await client.functions.errorInteraction(interaction);
			};
		} else {
			console.log(error);
			return await client.functions.errorInteraction(interaction);
		};
	},
};
