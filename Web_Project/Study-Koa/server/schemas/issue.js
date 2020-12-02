const mongoose = require('../config')

const Schema = mongoose.Schema

const Issue = new Schema({
  title: String,  // 标题
  detail: String, // 描述
  acadamy: {
    type: String,
    default: ''
  },
  imageUrl: Array, //图片url
  author_id: String,  // 发布者id
  authorName: String, // 发布者用户名
  publishTime: Date, // 发布日期
  watcher: Number, //关注者
  watchersid: Array,
  answers: Number, //回答数
  answersId: Array
}, {
  versionKey: false,
  timestamps: true
})

module.exports = mongoose.model('issue', Issue)