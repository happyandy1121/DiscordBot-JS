const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { level } = require('../../../../data/level')
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
    data: {
        name: [`confirm`],
    },
    async execute(interaction, client) {
        const name = interaction.user.username;
        const id = interaction.user.id;
        let result = interaction.message.content.split('')[2]
        interaction.channel.messages.fetch({around: interaction.message.id, limit: 1}).then(messages => {
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
                    let user_answer_str = user.UserInfo[i].answer.toString().replace(",","")
                    if (user_answer_str.replace(",","") != level[result]["answer"]) {
                        interaction.reply({
                            content: level[result]["goal"] + level[result]["question"],
                            components: [
                                button_creater(level[result]["button"]),
                                button_creater(level[result]["button2"]),
                            ],
                            fetchReply: true,
                        });
                        user.UserInfo[i].answer = [];
                        user.UserInfo[i].schedule = 0;
                        user.UserInfo[i].messageID = interaction.message.id;
                    } else {
                        let num = parseInt(result);
                        num++;
                        result = num.toString();
                        if (num >= 7) {
                            interaction.reply({
                                content: "感謝參與資訊週活動 祝福你可以抽到大鯊鯊<:cat_drink:1055354431782273075>",
                                fetchReply: true,
                            });
                        } else {
                            interaction.reply({
                                content: level[result]["goal"] + level[result]["question"],
                                components: [
                                    button_creater(level[result]["button"]),
                                    button_creater(level[result]["button2"]),
                                ],
                                fetchReply: true,
                            });
                            user.UserInfo[i].answer = [];
                            user.UserInfo[i].schedule = 0;
                            user.UserInfo[i].limit = level[result]["time_limit"];
                            user.UserInfo[i].messageID = interaction.message.id;
                            user.UserInfo[i].level = result;
                        }
                    }
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