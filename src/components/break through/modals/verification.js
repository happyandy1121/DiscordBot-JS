const { EmbedBuilder, Embed } = require('discord.js');
const { platinum } = require('../../../../data/roles')
let fs = require('fs'); 

module.exports = {
    data: {
        name: [`verification`],
    },
    async execute(interaction,client) {
        const result = interaction.fields.getTextInputValue('verificationInput')
        const name = interaction.user.username
        const id = interaction.user.id

        fs.readFile('./data/verification.json', function (err, UserInfo) {
            if (err) {
                return console.error(err);
            }
            let user = UserInfo.toString();
            user = JSON.parse(user);
            for (let i = 0; i < user.UserInfo.length; i++) {
                if (id == user.UserInfo[i].ID) {
                    if (user.UserInfo[i].pass == result) {
                        let newUser = {
                            "name": name,
                            "ID": id,
                            "Email": user.UserInfo[i].Email,
                            "language": "zh-tw"
                        }
                        fs.readFile('./data/user.json', function (err, UserInfo) {
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
                            fs.writeFile('./data/user.json', str, function (err) {
                                if (err) {
                                    console.error(err);
                                }
                            })
                        })
                        interaction.reply({
                            content: "註冊成功<:cat_drink:1055354431782273075>",
                            ephemeral: true
                        })
                        interaction.member.roles.add(platinum);
                    } else {
                        user.UserInfo.splice(i, 1);
                        let str = JSON.stringify(user, null, 2);
                        fs.writeFile('./data/verification.json', str, function (err) {
                            if (err) {
                                console.error(err);
                            }
                        })
                        interaction.reply({
                            content: "驗證碼錯誤 請重新註冊!",
                            ephemeral: true
                        })
                    }
                }
            }
        })
    }
}