const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { level, BUTTON_DICT } = require('../../../../data/level')
let fs = require('fs');

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

module.exports = {
	data: {
		name: [
			`a`, `b`, `c`, `i`, `j`, `%`, `*`, `/`, `and`, `or`, `0`, `1`, `2`, `5`, `9`, `10`, `19`, `20`, `21`, `99`, `100`, `101`
		],
	},
	async execute(interaction, client) {
		const name = interaction.user.username;
		const id = interaction.user.id;
		let result = interaction.message.content.split('')[2]
		interaction.channel.messages.fetch({ around: interaction.message.id, limit: 1 }).then(messages => {
			messages.first().delete()
		});
		fs.readFile('./data/test.json', function (err, UserInfo) {
			if (err) {
				return console.error(err);
			}
			let user = UserInfo.toString();
			user = JSON.parse(user);
			for (let i = 0; i < user.UserInfo.length; i++) {
				if (id == user.UserInfo[i].ID) {
					if (user.UserInfo[i].schedule >= user.UserInfo[i].limit) {
						for (let j = 0; j < user.UserInfo[i].answer.length; j++) {
							content = content.replace(BUTTON_DICT[j + 1], user.UserInfo[i].answer[j])
						}
						interaction.reply({
							content: content,
							components: [
								button_creater(level[result]["button"]),
								button_creater(level[result]["button2"]),
							],
							fetchReply: true,
						});
						return
					}
					user.UserInfo[i].answer.push(interaction.customId);
					content = level[result]["goal"] + level[result]["question"];
					for (let j = 0; j < user.UserInfo[i].answer.length; j++) {
						content = content.replace(BUTTON_DICT[j + 1], user.UserInfo[i].answer[j])
					}
					interaction.reply({
						content: content,
						components: [
							button_creater(level[result]["button"]),
							button_creater(level[result]["button2"]),
						],
						fetchReply: true,
					});
					user.UserInfo[i].schedule = user.UserInfo[i].schedule + 1;
				}
			}
			let str = JSON.stringify(user, null, 2);
			fs.writeFile('./data/test.json', str, function (err) {
				if (err) {
					console.error(err);
				}
			})
		})
	}
}