const { EmbedBuilder, MessageFlags } = require('discord.js');

async function cooldownReply(interaction, expirationTime) {
    const timeLeft = (expirationTime - (Date.now() / 1000)).toFixed(1);
    const Embed = new EmbedBuilder()
        .setAuthor({ name: `Лимит использования`, iconURL: `https://i.imgur.com/TzNgR0R.png` })
        .setDescription(`Подождите **${timeLeft}**с. перед повторным использованием взаимодействия.`)
        .setColor("Red")
        .setTimestamp();

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

module.exports = cooldownReply;