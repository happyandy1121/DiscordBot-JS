const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Daily = sequelize.define('daily', {
	id: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	continued: {
		type: Sequelize.NUMBER,
		allowNull: true
	},
	lastDaily: {
		type: Sequelize.DATE,
		allowNull: true
	},
})

module.exports = Daily