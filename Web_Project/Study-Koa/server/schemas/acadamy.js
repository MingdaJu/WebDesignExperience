const mongoose = require('../config')

const Schema = mongoose.Schema

const Acadamy = new Schema({
  label: String,
  key: String
},{
  versionKey: false,
  timestamps: true
})

module.exports = mongoose.model('acadamy',Acadamy)