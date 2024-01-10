const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextInputBuilder, TextInputStyle, EmbedBuilder, Embed } = require('discord.js');
const Member = require('../../models/member')
const Exp = require('../../models/exp')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rpg_register')
        .setDescription('註冊RPG帳號')
        .addStringOption(option =>
            option.setName('性別')
            .setDescription('請選擇性別')
            .setRequired(true)
            .addChoices(
                { name: '男', value: '男' }, 
                { name: '女', value: '女' }, 
            )
        )
        .addStringOption(option =>
            option.setName('名字')
            .setDescription('請輸入冒險家名稱')
            .setRequired(true)
        ),
        
    async execute(interaction, client) {
        const gender = interaction.options.getString('性別');
        const rpgName = interaction.options.getString('名字');
        const userID = interaction.user.id
        const userName = interaction.user.globalName
        const guildID = interaction.guild.id
        
        try {
            const exist = await Member.findOne({ where: { id: userID } })
            if (exist) await interaction.reply({ content: '你已經註冊過了', ephemeral: true })
            else {
                const [ member, creat1 ] = await Member.findOrCreate({ where: { id: userID } })
                await member.update({ 
                    guildName: userName, 
                    rpgName: rpgName, 
                    gender: gender, 
                    guildID: guildID 
                })
                const [ exp, creat2 ] = await Exp.findOrCreate({ where: { id: userID } })
                await exp.update({ 
                    rpgLevel: '1',
                    farmLevel: '1 0',
                    mineLevel: '1 0',
                    logLevel: '1 0',
                    fishLevel: '1 0',
                    makeLevel: '1 0'
                })
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