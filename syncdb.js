const Member = require('./src/models/member')
const Exp = require('./src/models/exp')
const Item = require('./src/models/item')
const PlayerItem = require('./src/models/player_item')
const Daily = require('./src/models/daily')

Member.sync({ alter: true })
Exp.sync({ alter: true })
PlayerItem.sync({ alter: true })
Item.sync({ alter: true })
Daily.sync({ alter: true })

//Member.sync({force: true})