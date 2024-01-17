const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Exp = sequelize.define('exp', {
	id: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	rpgLevel: {
		type: Sequelize.STRING,
		allowNull: true
	},
	farmLevel: {
		type: Sequelize.STRING,
		allowNull: true
	},
	mineLevel: {
		type: Sequelize.STRING,
		allowNull: true
	},
	logLevel: {
		type: Sequelize.STRING,
		allowNull: true
	},
	fishLevel: {
		type: Sequelize.STRING,
		allowNull: true
	},
	makeLevel: {
		type: Sequelize.STRING,
		allowNull: true
	}
})

module.exports = Exp