const { ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ButtonStyle, MessageFlags } = require("discord.js");

module.exports = {
    name: "ping_refresh",
    type: "button",
    options: {
        cooldown: 30,
    },
    async execute(interaction) {
        if (!interaction.isButton()) return;

        const { client, user, guild } = interaction;

        const update = new ActionRowBuilder().addComponents([new ButtonBuilder().setCustomId(`ping_refresh`).setStyle(ButtonStyle.Secondary).setLabel(`Обновить`)]);

        await interaction.update({
            embeds: [new EmbedBuilder()
                .setTitle(`${((client.functions.getById("emojis.stats")))} Статистика ${client.user.username}`.toUpperCase())
                .setDescription(`- Комманд: **${client?.commands?.map(a => a)?.length || 0}**\n- Заддержка: **${~~(Date.now() - interaction.createdTimestamp)}**ms`)
                .setColor(client.functions.getById("colors.default"))
                .setTimestamp()],
            components: [update],
        }).catch();
    },
};