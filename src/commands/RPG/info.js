const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextInputBuilder, TextInputStyle, EmbedBuilder, Embed } = require('discord.js');
const Member = require('../../models/member')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rpg_info')
        .setDescription('查詢玩家資料')
        .addUserOption(option =>
            option.setName('玩家')
            .setDescription('請選擇玩家')
        ),
        
    async execute(interaction, client) {
        try {
            const result = interaction.options.getUser('玩家');
            if (!result) {
                await interaction.reply({ content: '請輸入玩家', ephemeral: true })
                return
            }
            const exist = await Member.findOne({ where: { id: result.id } })
            if (!exist) {
                await interaction.reply({ content: '查無此玩家資料', ephemeral: true })
                return
            }
            const embed = new EmbedBuilder()
                .setTitle(`${exist.rpgName}的資料`)
                .setAuthor({
                    name: interaction.user.tag,
                    iconURL: interaction.user.displayAvatarURL(),
                })
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