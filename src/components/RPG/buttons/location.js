const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextInputBuilder, TextInputStyle, EmbedBuilder, Embed } = require('discord.js');
const { LocPicDIC, LocNameDIC, playerMessage } = require('../../../commands/RPG/play')
const { farmEmbed, farmButton } = require('../../../../data/RPG/farm')
const { townEmbed, townButton } = require('../../../../data/RPG/town')

const createButton = (customId, label, ButtonStyle, value) => {
	return new ButtonBuilder()
		.setCustomId(customId)
		.setLabel(label)
		.setStyle(ButtonStyle)
		.setDisabled(value);
};

const button_creater = (args) => {
	let buttons = []

	for (let i = 0; i < args.length; i += 4) {
		buttons.push(createButton(args[i], args[i + 1], args[i + 2], args[i + 3]));
	}
	return new ActionRowBuilder().addComponents(buttons)
}

const locDIC = {
	'townLoc': townButton,
	'farmLoc': farmButton,
	// 'mineLoc': mineButton,
	// 'logLoc': logButton,
	// 'fishLoc': fishButton,
}

module.exports = {
	data: {
		name: [`townLoc`, `farmLoc`, `mineLoc`, `logLoc`, `fishLoc`],
	},
	async execute(interaction, client) {
		const playerID = interaction.user.id
		const customID = interaction.customId
		const row1 = button_creater(locDIC[customID]["button1"])
		const row2 = button_creater(locDIC[customID]["button2"])

		if (customID === 'townLoc') { var embed = townEmbed(customID) }
		else if (customID === 'farmLoc') { var embed = farmEmbed(customID) }
		else if (customID === 'mineLoc') { var embed = mineEmbed(customID) }
		else if (customID === 'logLoc') { var embed = logEmbed(customID) }
		else if (customID === 'fishLoc') { var embed = fishEmbed(customID) }

		const message = await interaction.update({
			embeds: [embed],
			components: [
				row1,
				row2,
			],
			fetchReply: true
		})

		const collectorFilter = i => i.user.id === interaction.user.id;
		try {
			const confirmation = await message.awaitMessageComponent({ filter: collectorFilter, time: 10_000 });
			if (confirmation) return
		} catch (e) {
			row1.components.forEach(function (a) { a.setDisabled(true) })
			row2.components.forEach(function (b) { b.setDisabled(true) })
			await interaction.message.edit({
				embeds: [embed],
				components: [row1, row2],
				fetchReply: true
			})
			playerMessage[playerID] = ''
		}
	}
}