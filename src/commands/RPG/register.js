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
        
        try {
            const exist = await Member.findOne({ where: { id: userID } })
            if (exist) {
                await interaction.reply({ content: '你已經註冊過了', ephemeral: true })
                await exist.update({ name: userName })
            }
            else{
                const [ member, creat ] = await Member.findOrCreate({ where: { id: userID } })
                await member.update({ name: userName, guildID: guildID })
                await interaction.reply({ content: '帳號註冊成功', ephemeral: true })
            }
        } catch (error) {
            await interaction.reply({
                content: `There is no code for this question.\nYour donate will accelerate production!`,
                ephemeral: true
            });
        }
    }
}