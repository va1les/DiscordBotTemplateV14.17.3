const { MessageFlags } = require("discord.js");

module.exports = {
	name: "sample",
	type: "modalSubmit",

	async execute(interaction) {
		if (!interaction.isModalSubmit()) return;

		const { fields } = interaction;

		const input = fields.getTextInputValue('input');

		return interaction.reply({ content: `${input}`, flags: MessageFlags.Ephemeral });
	},
};
