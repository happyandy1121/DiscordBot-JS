const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextInputBuilder, TextInputStyle, EmbedBuilder, Embed } = require('discord.js');
const Member = require('../../models/member')
const { farmEmbed, farmButton } = require('../../../data/RPG/farm')

const playerMessage = {}

const createButton = (customId, label, ButtonStyle, vaule) => {
	return new ButtonBuilder()
		.setCustomId(customId)
		.setLabel(label)
		.setStyle(ButtonStyle)
		.setDisabled(vaule);
};

const button_creater = (args) => {
	let buttons = []

	for (let i = 0; i < args.length; i += 4) {
		buttons.push(createButton(args[i], args[i + 1], args[i + 2], args[i + 3]));
	}
	return new ActionRowBuilder().addComponents(buttons)
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rpg_play')
		.setDescription('開始遊玩RPG遊戲')
		.addStringOption(option =>
			option.setName('遊玩地區')
				.setDescription('選擇開始位置')
				.setRequired(true)
				.addChoices(
					{ name: '天極古城', value: 'townLoc' },
					{ name: '綠幻平原', value: 'farmLoc' },
					{ name: '晶石礦坑', value: 'mineLoc' },
					{ name: '憂鬱林場', value: 'logLoc' },
					{ name: '星河海灣', value: 'fishLoc' },
				)
		),
	async execute(interaction, client) {
		try {
			const playerID = interaction.user.id
			const guildID = interaction.guild.id
			const channelID = interaction.channel.id
			const loc = interaction.options.getString('遊玩地區');
			const exist = await Member.findOne({ where: { id: playerID } })
			if (!exist) {
				await interaction.reply({
					content: '尚未註冊RPG角色，請使用</rpg_register:1193948803284353025>註冊帳號',
					ephemeral: true
				})
				return
			}

			if (loc === 'townLoc') { var ans = townEmbed(loc) }
			else if (loc === 'farmLoc') { var embed = farmEmbed(loc) }
			else if (loc === 'mineLoc') { var embed = mineEmbed(loc) }
			else if (loc === 'logLoc') { var embed = logEmbed(loc) }
			else if (loc === 'fishLoc') { var embed = fishEmbed(loc) }

			if (playerMessage[playerID]) {
				await interaction.reply({
					content: `你已經使用過此指令，請點選 ${playerMessage[playerID]} 前往之前的指令`,
					fetchReply: true
				})
			}
			else {
				const row1 = button_creater(farmButton["button1"])
				const row2 = button_creater(farmButton["button2"])

				const message = await interaction.reply({
					embeds: [embed],
					components: [row1, row2],
					fetchReply: true
				})

				playerMessage[playerID] = `https://discord.com/channels/${guildID}/${channelID}/${message.id}`

				const collectorFilter = i => i.user.id === interaction.user.id;
				try {
					const confirmation = await message.awaitMessageComponent({ filter: collectorFilter, time: 10_000 });
					if (confirmation) return
				} catch (e) {
					row1.components.forEach(function (a) { a.setDisabled(true) })
					row2.components.forEach(function (b) { b.setDisabled(true) })
					interaction.editReply({
						embeds: [embed],
						components: [row1, row2],
						fetchReply: true
					})
					playerMessage[playerID] = ''
				}
			}

		} catch (error) {
			await interaction.reply({
				content: `There is no code for this question.\nYour donate will accelerate production!`,
				ephemeral: true
			});
		}
	},
	playerMessage
}