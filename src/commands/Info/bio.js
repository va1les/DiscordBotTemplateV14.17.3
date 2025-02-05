const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, MessageFlags } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bio')
        .setDescription("Set a Biography")
        .addStringOption(option => option.setName(`biography`).setDescription(`Biography`).setMaxLength(128).setMinLength(4).setRequired(false)),
    options: {
        cooldown: 60,
    },
    async execute(interaction) {
        const { client, user, guild, options } = interaction;

        const bio = options.getString(`biography`);
        await interaction.deferReply({ withResponse: true, flags: MessageFlags.Ephemeral }).catch();

        if (!bio) { // если поле для ввода биографии пустое:
            const user_data = await client.functions.findOne("user", { uid: user.id, gid: guild.id });
            /*
            своя функция findOne:
                type — тип для обновления 
                filter — по каким данным искать
                create — создать ли документ, если данные не были найдены (по умолчанию true)
            */

            return await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${client.functions.getById("emojis.success")} Биография ${user.username}`.toUpperCase())
                        .setDescription(`**Биография:** ${user_data?.bio ? `\`\`\`\n${user_data?.bio}\`\`\`` : `Отсутствует`}`)
                        .setColor(client.functions.getById("colors.default"))
                        .setTimestamp()
                ],
            }).catch()
        };
        //                                                          type  |            filter             |          data      |    options | old
        const updated_user_data = await client.functions.updateOne("user", { uid: user.id, gid: guild.id }, { $set: { "bio": bio } }, {}, true);
        /*
        своя функция updateOne со своими приколами:
            type — тип для обновления 
            filter — по каким данным искать
            data — что обновлять
            options — доп. опции (если надо)
            old — вернуть ли старые данные

        в данном случае мы передаем:
            type: "user" (пользователь)
            filter: { uid: user.id, gid: guild.id } (поиск по uid и gid)
            data: { $set: { "bio": bio } }, (используем метод $set для установки bio в базе данных)
            options: {},
            old: true (для получения информации до обновления)
        */

        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`${client.functions.getById("emojis.success")} Биография ${user.username}`.toUpperCase())
                    .setDescription(`\`\`\`diff${updated_user_data?.old?.bio ? `\n- ${updated_user_data?.old?.bio}\n+ ${updated_user_data?.bio}` : `\n+ ${updated_user_data?.bio}`}\`\`\``)
                    .setColor(client.functions.getById("colors.default"))
                    .setTimestamp()
            ],
        }).catch();
    },
};