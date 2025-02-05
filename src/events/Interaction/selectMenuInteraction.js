const { Events, Collection, MessageFlags } = require("discord.js");
const { developers } = require("../../../config.json");

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		const { client, user } = interaction;
		const { cooldowns } = client;

		if (!interaction.isAnySelectMenu()) return;

		try {
			const selectmenus = client.components.get(interaction.customId)?.filter(component => component.type === "selectmenu");

			if (!selectmenus) return;

			for (const selectmenu of selectmenus) {
				if (selectmenu.options && selectmenu.options?.ownerOnly && !developers.includes(user.id)) {
					return interaction.reply({ content: `${client.functions.getById(`emojis.error`)} Эта команда недоступна для использования.`, flags: MessageFlags.Ephemeral }).catch();
				};

				if (selectmenu.options && selectmenu.options?.bot_permissions && !guild.members.me.permissions.has(selectmenu.options?.bot_permissions)) {
					const permsBot = selectmenu.options?.bot_permissions?.map(x => x).join(', ');

					return interaction.reply({ content: `${client.functions.getById(`emojis.error`)} Боту не хватает прав: ${permsBot}.`, flags: MessageFlags.Ephemeral });
				};

				if (!cooldowns.has(interaction.customId)) {
					cooldowns.set(interaction.customId, new Collection());
				};

				const now = Date.now();
				const timestamps = cooldowns.get(interaction.customId);
				const cooldownAmount = (selectmenu.options?.cooldown ?? 5) * 1000;

				if (timestamps.has(user.id)) {
					const expirationTime = timestamps.get(user.id) + cooldownAmount;

					if (now < expirationTime) {
						const expiredTimestamp = Math.round(expirationTime / 1000);

						return await client.functions.cooldownReply(interaction, expiredTimestamp);
					};
				};

				timestamps.set(user.id, now);
				setTimeout(() => timestamps.delete(user.id), cooldownAmount);

				return selectmenu.execute(interaction);
			};
		} catch (error) {
			console.log(error);
			return await client.functions.errorInteraction(interaction);
		};
	},
};
