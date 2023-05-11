const translate = require('translate-google')
const { robot } = require('../../../data/roles')
let fs = require('fs');

module.exports = {
    name: 'messageReactionAdd',
    async execute(client, reaction) {
        if (client.message.author.id == robot) {
            return;
        }
        if (reaction.id == robot) {
            return;
        }
        if (client.emoji.name === 'tran' ) {
            const id = reaction.id
            const message = client.message.content
            fs.readFile('./data/user.json', function (err, UserInfo) {
                if (err) return console.error(err);
                let user = UserInfo.toString();
                user = JSON.parse(user);
                for (let i = 0; i < user.UserInfo.length; i++) {
                    if (id == user.UserInfo[i].ID) {
                        translate(message, {to: user.UserInfo[i].language}).then(res => {
                            client.message.channel.send({
                                content: res,
                                ephemeral: true
                            })
                        }).catch(err => {
                            console.error(err)
                        })
                    }
                }
            })
        }
    }
}