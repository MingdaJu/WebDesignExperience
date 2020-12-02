const mongoose = require('../config')

const Schema = mongoose.Schema

const File = new Schema({
  fileName: String, //文件名 可修改
  summary: String,  //文件摘要 可修改
  fileType: String, //文件类型
  fileUrl: String,  //文件位置
  lastModified: Date, //文件修改日期 
  size: Number, //文件大小
  title: String,  //文件标题 可修改
  acadamy: String,  //文件学院 可修改
  objectType: Number,  //文件类型(笔记/课件) 可修改
  author_id: String,  //用户id 
  uploadTime: Date, //上传时间
  download: Number, //下载量
  collect: Number //收藏量
}, {
  versionKey: false,
  timestamps: true
})

module.exports = mongoose.model('file', File)