const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Embed } = require('discord.js');
const { cpe } = require('../../../data/cpe')
const { all } = require('../../../data/roles')
let fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('language')
        .setDescription('更改語言')
        .addStringOption(option =>
            option.setName('語言')
                .setDescription('請選擇要更改的語言')
                .setRequired(true)
                .addChoices(
                    { name: '繁體中文', value: 'zh-tw' },
                    { name: '简体中文', value: 'zh-cn' },
                    { name: 'English', value: 'en' },
                    { name: '日本語', value: 'ja' },
                    { name: '한글', value: 'ko'  },
                )
            ),
    async execute(interaction, client) {
        const result = interaction.options.getString('語言');
        const id = interaction.user.id
        let allow = false
        all.forEach(function(element) {
            let hasRole = interaction.member.roles.cache.get(element);
            if (hasRole) {
                allow = true
            }
        });
        if (allow === false) {
            await interaction.reply({
                content: '請先註冊會員',
                ephemeral: true
            })
            return;
        }
        fs.readFile('./data/user.json', function (err, UserInfo) {
            if (err) {
                return console.error(err);
            }
            let user = UserInfo.toString();
            user = JSON.parse(user);
            for (let i = 0; i < user.UserInfo.length; i++) {
                if (id == user.UserInfo[i].ID) {
                    user.UserInfo[i].language = result;
                }
            }
            let str = JSON.stringify(user, null, 2);
            fs.writeFile('./data/user.json', str, function (err) {
                if (err) {
                    console.error(err);
                }
            })
        })
        await interaction.reply({
            content: '更改成功',
            ephemeral: true,
        })
    }
}