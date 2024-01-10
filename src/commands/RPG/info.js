const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextInputBuilder, TextInputStyle, EmbedBuilder, Embed } = require('discord.js');
const Member = require('../../models/member')
const Exp = require('../../models/exp')
const { info } = require('../../../data/RPG/exp')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rpg_info')
        .setDescription('查詢玩家資料')
        .addUserOption(option =>
            option.setName('玩家')
            .setDescription('請選擇玩家')
            .setRequired(true)
        ),
        
    async execute(interaction, client) {
        try {
            const result = interaction.options.getUser('玩家');
            const exist = await Member.findOne({ where: { id: result.id } })
            const expUser = await Exp.findOne({ where: { id: result.id } })
            if (!exist) {
                await interaction.reply({ content: '查無此玩家資料', ephemeral: true })
                return
            }
            if (exist.gender === '男') var gender = 'https://i.imgur.com/rKflFra.jpg'
            else var gender = 'https://i.imgur.com/ws2fLCs.jpg'

            const embed = new EmbedBuilder()
                .setTitle(`${exist.rpgName}的資料`)
                .setAuthor({
                    name: exist.guildName,
                    //iconURL: interaction.user.displayAvatarURL(),
                })
                .setThumbnail(gender)
                .addFields({ name: '熟練等級', value: info(expUser), inline: true })
                .setColor(0x00ffff)

            if (exist) await interaction.reply({ embeds: [embed] }) 

        } catch (error) {
            await interaction.reply({
                content: `There is no code for this question.\nYour donate will accelerate production!`,
                ephemeral: true
            });
        }
    }
}