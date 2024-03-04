const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Member = sequelize.define('member', {
	id: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	guildName: {
		type: Sequelize.STRING,
		allowNull: true
	},
	rpgName: {
		type: Sequelize.STRING,
		allowNull: true
	},
	gender: {
		type: Sequelize.STRING,
		allowNull: true
	},
	guildID: {
		type: Sequelize.STRING,
		allowNull: true
	},
	money: {
		type: Sequelize.INTEGER,
		allowNull: true
	}
})

module.exports = Member