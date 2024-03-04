const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const PlayerItem = sequelize.define('playerItem', {
	water: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	userId: {
		type: Sequelize.STRING,
		allowNull: true
	},
	itemID: {
		type: Sequelize.STRING,
		allowNull: true
	},
	itemType: {
		type: Sequelize.STRING,
		allowNull: true
	},
	num: {
		type: Sequelize.STRING,
		allowNull: true
	}
})

module.exports = PlayerItem