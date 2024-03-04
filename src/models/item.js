const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Item = sequelize.define('item', {
	itemId: {
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
	level: { // 等級限制
		type: Sequelize.STRING,
		allowNull: true
	},
	pic: { // 貼圖
		type: Sequelize.STRING,
		allowNull: true
	},
})

module.exports = Item