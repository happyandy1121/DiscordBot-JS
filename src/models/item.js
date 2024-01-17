const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Item = sequelize.define('item', {
	id: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: true
	},
	des: {
		type: Sequelize.STRING,
		allowNull: true
	},
	level: {
		type: Sequelize.STRING,
		allowNull: true
	},
	pic: {
		type: Sequelize.STRING,
		allowNull: true
	},
})

module.exports = Item