const { EmbedBuilder, Embed } = require('discord.js');

module.exports = {
    data: {
        name: [`report`],
    },
    async execute(interaction,client) {
        const question = interaction.message.content.split('\n')[0]
        const embed = new EmbedBuilder()
            .setTitle(question)
            .setDescription(interaction.fields.getTextInputValue('reportInput'))
            .setAuthor({
                name: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL(),
            })
            .setColor(0xff0000)

        await interaction.reply({
            content: "回報成功<:cat_drink:1055354431782273075>",
            ephemeral: true
        })
        client.users.fetch('584315794012241933').then((user) => {
            user.send({
                embeds: [embed],
            });
        });
    }
}