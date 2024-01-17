const { SlashCommandBuilder } = require('discord.js');
const { cpe } = require('../../../data/cpe')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cpe_2')
		.setDescription('題號26-49')
		.addIntegerOption(option =>
			option.setName('題號')
				.setDescription('UVA')
				.setRequired(true)
				.addChoices(
					{ name: '10226', value: 10226 },
					{ name: '10235', value: 10235 },
					{ name: '10242', value: 10242 },
					{ name: '10252', value: 10252 },
					{ name: '10268', value: 10268 },
					{ name: '10409', value: 10409 },
					{ name: '10415', value: 10415 },
					{ name: '10420', value: 10420 },
					{ name: '10642', value: 10642 },
					{ name: '10783', value: 10783 },
					{ name: '10812', value: 10812 },
					{ name: '10908', value: 10908 },
					{ name: '10922', value: 10922 },
					{ name: '10929', value: 10929 },
					{ name: '10931', value: 10931 },
					{ name: '11005', value: 11005 },
					{ name: '11063', value: 11063 },
					{ name: '11150', value: 11150 },
					{ name: '11321', value: 11321 },
					{ name: '11332', value: 11332 },
					{ name: '11349', value: 11349 },
					{ name: '11417', value: 11417 },
					{ name: '11461', value: 11461 },
					{ name: '12019', value: 12019 }
				)
		),
	async execute(interaction, client) {
		const result = interaction.options.getInteger('題號');
		try {
			const code = "```py\n" + cpe[result]["code"] + "```";
			const explain = cpe[result]["explain"];
			await interaction.reply({
				content: `UVA${result}\n程式碼:\n` + code,
			})
			await interaction.followUp({
				content: explain,
			});
		} catch (error) {
			await interaction.reply({
				content: `There is no code for this question.\nYour donate will accelerate production!`,
				ephemeral: true
			});
		}
	}
}