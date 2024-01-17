const { robot } = require('../../../data/roles')

module.exports = {
	name: 'messageCreate',
	async execute(client) {
		if (client.author.id == robot) {
			return;
		}
		if (client.channel.id == '1089092910676443136') {
			client.react("<:tran:1056423371551809618>")
		};
	}
}