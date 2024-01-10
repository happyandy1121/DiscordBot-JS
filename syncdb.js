const Member = require('./src/models/member')
const Exp = require('./src/models/exp')

Member.sync({alter: true})
Exp.sync({alter: true})

//Member.sync({force: true})