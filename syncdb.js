const Member = require('./src/models/member')

Member.sync({alter: true})

//Member.sync({force: true})