const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Member = sequelize.define('member', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    guildID: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = Member