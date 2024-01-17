const { SlashCommandBuilder } = require('discord.js');
const { ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const nodemailer = require('nodemailer')
const { token } = require('../../../data/password.json')
let fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('註冊會員')
		.addStringOption(option =>
			option.setName('email')
				.setDescription('請輸入學校信箱')
				.setRequired(true)
		),
	async execute(interaction, client) {
		const result = interaction.options.getString('email');
		const name = interaction.user.username;
		const id = interaction.user.id;
		const suffix = "@nptu.edu.tw";
		const randomNumberString = Math.floor(Math.random() * 900000) + 100000 + '';
		var regex_1 = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var regex_2 = /^[a-z]{3}\d{6}@nptu.edu.tw$/;
		if (!regex_1.test(result)) {
			await interaction.reply({
				content: '請輸入正確的email格式<:cat_shot:1055350455296868454>',
				ephemeral: true
			});
			return;
		}
		if (!regex_2.test(result)) {
			await interaction.reply({
				content: '請使用學校信箱<:cat_ya:1055355023070068736>',
				ephemeral: true
			});
			return;
		}
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			auth: {
				user: token.name,
				pass: token.pass,
			},
		})
		transporter.sendMail({
			from: token.name,
			to: result,
			subject: '驗證碼',
			text: randomNumberString,
		})

		let newUser = {
			"name": name,
			"ID": id,
			"Email": result,
			"pass": randomNumberString
		}
		fs.readFile('./data/verification.json', function (err, UserInfo) {
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
			fs.writeFile('./data/verification.json', str, function (err) {
				if (err) {
					console.error(err);
				}
			})
		})

		const modal = new ModalBuilder()
			.setCustomId(`verification`)
			.setTitle(`驗證碼`)

		const textInput = new TextInputBuilder()
			.setCustomId('verificationInput')
			.setLabel(`請輸入驗證碼`)
			.setRequired(true)
			.setStyle(TextInputStyle.Short)

		modal.addComponents(new ActionRowBuilder().addComponents(textInput));

		await interaction.showModal(modal)
	}
}