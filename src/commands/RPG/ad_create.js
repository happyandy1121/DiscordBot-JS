const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextInputBuilder, TextInputStyle, EmbedBuilder, Embed } = require('discord.js');
const Member = require('../../models/member')
const Exp = require('../../models/exp')
const { expAdd } = require('../../../data/RPG/exp')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create')
		.setDescription('for admin')
		.addSubcommand(subcommand =>
			subcommand
				.setName('exp')
				.setDescription('manage exp')
				.addStringOption(option =>
					option.setName('work')
						.setDescription('choose')
						.setRequired(true)
						.addChoices(
							{ name: 'farm', value: 'farmLevel' },
							{ name: 'mine', value: 'mineLevel' },
							{ name: 'log', value: 'logLevel' },
							{ name: 'fish', value: 'fishLevel' },
							{ name: 'make', value: 'makeLevel' },
						)
				)
				.addStringOption(option =>
					option.setName('num')
						.setDescription('give')
						.setRequired(true)
				)
				.addUserOption(option =>
					option.setName('player')
						.setDescription('choose')
						.setRequired(true)
				),
		),

	async execute(interaction, client) {
		try {
			if ((interaction.user.id !== '584315794012241933') || (interaction.user.id !== '595136149354446858')) return
			const work = interaction.options.getString('work');
			const num = interaction.options.getString('num');
			const result = interaction.options.getUser('player');
			const expUser = await Exp.findOne({ where: { id: result.id } })
			if (!expUser) {
				await interaction.reply({ content: '查無此玩家資料', ephemeral: true })
				return
			}

			if (work) {
				if (work === 'farmLevel') {
					await expUser.update({ farmLevel: expAdd(expUser, work, num) });
					await interaction.reply({ content: '經驗值更改成功' })
				}
				else if (work === 'mineLevel') {
					await expUser.update({ mineLevel: expAdd(expUser, work, num) });
					await interaction.reply({ content: '經驗值更改成功' })
				}
				else if (work === 'logLevel') {
					await expUser.update({ logLevel: expAdd(expUser, work, num) });
					await interaction.reply({ content: '經驗值更改成功' })
				}
				else if (work === 'fishLevel') {
					await expUser.update({ fishLevel: expAdd(expUser, work, num) });
					await interaction.reply({ content: '經驗值更改成功' })
				}
				else if (work === 'makeLevel') {
					await expUser.update({ makeLevel: expAdd(expUser, work, num) });
					await interaction.reply({ content: '經驗值更改成功' })
				}
				else {
					await interaction.reply({ content: '怪怪的' })
				}
			}

		} catch (error) {
			await interaction.reply({
				content: `There is no code for this question.\nYour donate will accelerate production!`,
				ephemeral: true
			});
		}
	}
}