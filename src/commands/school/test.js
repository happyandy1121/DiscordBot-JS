const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { level } = require('../../../data/level')
let fs = require('fs');

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
		.setName('test')
		.setDescription('資訊週闖關')
		.addIntegerOption(option =>
			option.setName('關卡')
				.setDescription('請選擇關卡')
				.setRequired(true)
				.addChoices(
					{ name: '1', value: 1 },
					{ name: '2', value: 2 },
					{ name: '3', value: 3 },
					{ name: '4', value: 4 },
					{ name: '5', value: 5 },
					{ name: '6', value: 6 },
				)
		),

	async execute(interaction, client) {
		const result = interaction.options.getInteger('關卡');
		const name = interaction.user.username;
		const id = interaction.user.id;

		try {
			await interaction.reply({
				content: level[result]["goal"] + level[result]["question"],
				components: [
					button_creater(level[result]["button"]),
					button_creater(level[result]["button2"]),
				],
				fetchReply: true,
			});
			const message = await interaction.fetchReply();
			let newUser = {
				"name": name,
				"ID": id,
				"level": result,
				"answer": [],
				"messageID": message.id,
				"schedule": 0,
				"limit": level[result]["time_limit"],
			}
			fs.readFile('./data/test.json', function (err, UserInfo) {
				if (err) {
					return console.error(err);
				}
				let user = UserInfo.toString();
				user = JSON.parse(user);
				for (let i = 0; i < user.UserInfo.length; i++) {
					if (id == user.UserInfo[i].ID) {
						user.UserInfo.splice(i, 1);
					}
				}
				user.UserInfo.push(newUser);
				let str = JSON.stringify(user, null, 2);
				fs.writeFile('./data/test.json', str, function (err) {
					if (err) {
						console.error(err);
					}
				})
			})
		} catch (error) {
			await interaction.reply({
				content: `There is no code for this question.\nYour donate will accelerate production!`,
				ephemeral: true
			});
		}
	}
}