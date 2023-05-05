const { SlashCommandBuilder } = require('discord.js');
const { nodemailer } = require('nodemailer')

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
        const suffix = "@nptu.edu.tw";
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(result)) {
            await interaction.reply('請輸入正確的email格式<:cat_shot:1055350455296868454>');
            return;
        }
        if (!result.endsWith(suffix)) {
            await interaction.reply('請使用學校信箱<:cat_ya:1055355023070068736>');
            return;
        }
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: 'serversmallassistant@gmail.com',
                pass: ,
            },
        })

        transporter.sendMail({
          from: token.test.name, // 寄件人
          to: result, // 收件人 多位用,分開 例:'a@XXX, b@XXX, c@XXX'
          subject: '驗證碼', // 輸入信件主旨
          html: '', // 輸入信件內容 文字用text HTML用html
          /*attachments: [{
            filename: 'a.txt',
            path: 'C:/Users/andym/OneDrive/桌面/JavaScript/smpt mail/a.txt'
        },
          {
            filename: 'b.txt',
            path: 'C:/Users/andym/OneDrive/桌面/JavaScript/smpt mail/b.txt'
        },
        ]*/

        }).then(info => {
          console.log({ info })
        }).catch(console.error)

    }
}