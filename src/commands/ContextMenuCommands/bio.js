const { EmbedBuilder, MessageFlags, ApplicationCommandType, InteractionContextType, ApplicationIntegrationType } = require('discord.js')
const { ContextMenuCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Biography')
        .setType(ApplicationCommandType.User)
        .setContexts(InteractionContextType.Guild)
        .setIntegrationTypes(ApplicationIntegrationType.GuildInstall),
    async execute(interaction) {
        const { client, user, guild, targetUser } = interaction;

        await interaction.deferReply({ withResponse: true, flags: MessageFlags.Ephemeral }).catch();

        const targetUser_data = await client.functions.findOne("user", { uid: targetUser.id, gid: guild.id });
        /*
        своя функция findOne:
            type — тип для обновления 
            filter — по каким данным искать
            create — создать ли документ, если данные не были найдены (по умолчанию true)
        */

        return await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`${client.functions.getById("emojis.success")} Биография ${targetUser.username}`.toUpperCase())
                    .setDescription(`**Биография:** ${targetUser_data?.bio ? `\`\`\`\n${targetUser_data?.bio}\`\`\`` : `Отсутствует`}`)
                    .setColor(client.functions.getById("colors.default"))
                    .setTimestamp()
            ],
        }).catch()
    },
};