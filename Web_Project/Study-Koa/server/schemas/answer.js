const mongoose = require('../config')

const Schema = mongoose.Schema

const Answer = new Schema({
  issue: String, // issue id
  issueTitle: String,
  target: { // 回复目标
    type: String,
    default: ''
  },
  detail: String, // 描述
  author_id: String,  // 发布者id
  authorName: String, // 发布者用户名
  publishTime: Date, // 发布日期
  approve: {
    type: Number,
    default: 0
  }, //赞成数
  against: {
    type: Number,
    default: 0
  } //反对数
}, {
  versionKey: false,
  timestamps: true
})

module.exports = mongoose.model('answer', Answer)