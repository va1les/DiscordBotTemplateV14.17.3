const { EmbedBuilder, MessageFlags } = require('discord.js');

async function errorInteraction(interaction) {
    const Embed = new EmbedBuilder().setAuthor({ name: `Ошибка взаимодействия`, iconURL: `https://i.imgur.com/TzNgR0R.png` })
        .setDescription(`Время этого взаимодействия истекло. При необходимости вызовите связанную с ним команду еще раз.`)
        .setColor("Red")
        .setTimestamp()

    if (interaction?.deferred) {
        return interaction.editReply({
            embeds: [Embed],
        }).catch();
    } else if (interaction?.replied) {
        return interaction.followUp({
            embeds: [Embed],
            flags: MessageFlags.Ephemeral
        }).catch();
    } else {
        return interaction.reply({
            embeds: [Embed],
            flags: MessageFlags.Ephemeral
        }).catch();
    };
};

module.exports = errorInteraction;