const translate = require('translate-google')
const { robot } = require('../../../data/roles')
let fs = require('fs'); 

module.exports = {
    name: 'messageReactionAdd',
    async execute(client) {
        if (client.user.id == robot) return;
        console.log('aaaaaaaaaaa')
    }
}