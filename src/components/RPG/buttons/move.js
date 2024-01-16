const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextInputBuilder, TextInputStyle, EmbedBuilder, Embed } = require('discord.js');

module.exports = {
    data: {
        name: [`move`],
    },
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle(`還沒想到.w.`)
            .setAuthor({
                name: '123',
                //iconURL: interaction.user.displayAvatarURL(),
            })
            .setColor(0x00ffff)

        await interaction.message.edit({
            embeds: [embed],
            components: [],
            ephemeral: true
        })
    }
}