const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	data: {
		name: [`report`],
	},
	async execute(interaction, client) {
		const modal = new ModalBuilder()
			.setCustomId(`report`)
			.setTitle(`問題回報`)

		const textInput = new TextInputBuilder()
			.setCustomId('reportInput')
			.setLabel(`請說明問題`)
			.setRequired(true)
			.setStyle(TextInputStyle.Short)

		modal.addComponents(new ActionRowBuilder().addComponents(textInput));

		await interaction.showModal(modal)
	}
}