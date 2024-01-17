const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextInputBuilder, TextInputStyle, EmbedBuilder, Embed } = require('discord.js');
const { playerMessage } = require('../../../commands/RPG/play')

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

const embed = new EmbedBuilder()
	.setTitle(`想要移動到什麼地方`)
	.setAuthor({
		name: '世界地圖',
		//iconURL: interaction.user.displayAvatarURL(),
	})
	.setColor(0x00ffff)

const moveButton = {
	"button1": [
		'townLoc', '天極古城', ButtonStyle.Primary, false,
		'farmLoc', '綠幻平原', ButtonStyle.Primary, false,
		'mineLoc', '晶石礦坑', ButtonStyle.Primary, false,
		'logLoc', '憂鬱林場', ButtonStyle.Primary, false,
		'fishLoc', '星河海灣', ButtonStyle.Primary, false,
	],
}

module.exports = {
	data: {
		name: [`move`],
	},
	async execute(interaction, client) {
		const playerID = interaction.user.id
		const row1 = button_creater(moveButton["button1"])
		const message = await interaction.update({
			embeds: [embed],
			components: [row1],
			fetchReply: true
		})
		const collectorFilter = i => i.user.id === interaction.user.id;
		try {
			const confirmation = await message.awaitMessageComponent({ filter: collectorFilter, time: 10_000 });
			if (confirmation) return
		} catch (e) {
			row1.components.forEach(function (a) { a.setDisabled(true) })
			await interaction.message.edit({
				embeds: [embed],
				components: [row1],
				fetchReply: true
			})
			playerMessage[playerID] = ''
		}
	}
}