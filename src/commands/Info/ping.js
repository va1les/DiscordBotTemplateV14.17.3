const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, MessageFlags } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Send a ping request"),
    async execute(interaction) {
        const { client, user } = interaction;

        await interaction.deferReply({ withResponse: true, flags: MessageFlags.Ephemeral }).catch();

        const reply = await interaction.fetchReply().catch();
        const update = new ActionRowBuilder().addComponents([new ButtonBuilder().setCustomId(`ping_refresh`).setStyle(ButtonStyle.Secondary).setLabel(`Обновить`)]);
        const shardId = client.shard.ids[0];

        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`${client.functions.getById("emojis.stats")} Статистика ${user.username}`.toUpperCase())
                    .setDescription(`- Комманд: **${client?.commands?.map(a => a)?.length || 0}**\n- Заддержка: **${~~(reply.createdTimestamp - interaction.createdTimestamp)}**ms`)
                    .setColor(client.functions.getById("colors.default"))
                    .setTimestamp()
            ],
            components: [update],
            flags: MessageFlags.Ephemeral
        }).catch();
    },
};