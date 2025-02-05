const { Events, Collection } = require("discord.js");
const { developers } = require("../../../config.json");

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		const { client, guild, user } = interaction;

		if (!interaction.isAutocomplete()) return;

		try {
			const autocompletes = client.components.get(interaction.commandName)?.filter(component => component.type === "autocomplete");

			if (!autocompletes) return interaction.respond([]);

			for (const autocomplete of autocompletes) {
				if (autocomplete.options && autocomplete.options?.ownerOnly && !developers.includes(user.id)) {
					return interaction.respond([]);
				};

				return autocomplete.execute(interaction);
			};
		} catch (error) {
			console.log(error);
			return interaction.respond([]);
		};
	},
};
