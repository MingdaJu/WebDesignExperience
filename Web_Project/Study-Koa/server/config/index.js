const mongoose = require('mongoose')
require('dotenv').config({ silent: true })

// 数据库连接
// mongoose.connect()
// mongoose.connect(`mongodb://${ process.env.DB_USER }:${ process.env.DB_PASSWORD }@${ process.env.DB_HOST }:${ process.env.DB_PORT }/${ process.env.DB_NAME }`)
mongoose.connect('mongodb://onefan:12345a@ds034208.mlab.com:34208/finalproject')
module.exports = mongoose;