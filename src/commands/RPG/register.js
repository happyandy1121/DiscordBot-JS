const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextInputBuilder, TextInputStyle, EmbedBuilder, Embed } = require('discord.js');
const Member = require('../../models/member')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rpg_register')
        .setDescription('註冊RPG帳號'),
        
    async execute(interaction, client) {
        const userID = interaction.user.id
        const userName = interaction.user.globalName
        const guildID = interaction.guild.id

        const [ member, creat ] = await Member.findOrCreate({ where: { id: userID } })
        await member.update({ 
            name: userName,
            guildID: guildID
        })

        await interaction.reply({
            content: '帳號註冊成功',
            ephemeral: true
        })
    }
}