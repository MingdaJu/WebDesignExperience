// const File = require('../models/file')
const uploadfile = require('../utils/uploadFile').uploadFile
const path = require('path')
const File = require('../models/file')
const User = require('../models/user')
const send = require('koa-send')

const getFile = async(ctx) => {
  // 获取所有文件列表
  /*
    this.$http.get('/api/file')
  */
  let fileList = await File.getFileList()
  ctx.body = {
    success: true,
    data: fileList
  }
}

const getFileByAcadamy = async(ctx) => {
  // 获取某学院文件列表
  /*
    this.$http.get('/api/getfilebyacadamy?acadamy=xxx')
  */
  let acadamy = ctx.query.acadamy
  if(!acadamy) {
    ctx.body = {
      success: false,
      msg: '学院不存在'
    }
    return
  }
  const result = await File.getFileListByCond({acadamy: acadamy})
  ctx.body = {
    success: true,
    data: result
  }
}

const getFileByAuthor = async(ctx) => {
  // 获取某用户文件列表
  /*
    this.$http.get('/api/getfilebyauthor?author_id=xxxxx')
  */
  let author_id = ctx.query.author_id
  if(!author_id) {
    ctx.body = {
      success: false,
      msg: '用户id不存在'
    }
    return
  }
  const result = await File.getFileListByCond({author_id: author_id})
  ctx.body = {
    success: true,
    data: result
  }
}

const getFileByids = async(ctx) => {
  // 根据文件id数组获取文件
  /**
   * idList: [] 
   */

  let idList = ctx.request.body.idList
  if(!idList) {
    ctx.body = {
      success: false,
      msg: '文件id不存在'
    }
    return
  }

  const result = await File.getFileListByids(idList)

  ctx.body = {
    success: true,
    data: result
  }
}

// 改
const downloadFile = async(ctx) => {
  // 下载文件
  const fileName = ctx.query.name
  const rawName = ctx.query.raw
  const file_id = ctx.query.id
  const user_id = ctx.query.user_id
  if(!(fileName && rawName && file_id && user_id)) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }
  ctx.attachment(rawName)
  await send(ctx, fileName, {root: path.join(__dirname, '../','../','upload')})

  await File.increaseFileDownload(file_id)
  await User.updateUserDownloadList(user_id, file_id)
}

const addFile = async(ctx, next) => {
  // 添加文件
  const tokenUserid = ctx.tokenUserid
  let result = await uploadfile(ctx, {
    fileType: 'common',
    path: path.join(__dirname, '../','../','upload')
  })
  if(!result) {
    ctx.body = {
      success: false,
      msg: '上传失败'
    }
    return
  }
  
  let fileId = await File.addFile({
    fileName: result.fileName,
    fileType: result.fileType,
    fileUrl: result.fileUrl,
    lastModified: result.lastModified,
    uploadTime: result.lastModified,
    size: result.size,
  })

  ctx.body = {
    success: result.success,
    msg: result.message,
    id: fileId
  }
}

const setInfo = async(ctx) => {
  // 设置文件信息
  /*
    this.$http.post('/api/file-info',{
      id: xxxx,
      info: {
        name: xxx,
        acadamy: xxx,
        objectType: 0|1,
        summary: xxxxx
      },
      author_id: xxxxx
    })
  */
  const tokenUserid = ctx.tokenUserid
  let {id, info, author_id} = ctx.request.body
  if(!id || !info || !author_id) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }
  await File.setFileInfo(id, info)
  await User.updateUserUploadList(author_id,id)
  ctx.body = {
    success: true
  }
}

//改
const deleFile = async(ctx) => {
  // 删除文件
  /*
    id: _id
    user_id
    this.$http.get('/api/deletefile?id=xxxxxxx&user_id=xxx')
  */
  const tokenUserid = ctx.tokenUserid
  let {id,user_id} = ctx.query
  if(!id || !user_id || user_id != tokenUserid) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }
  let result = await File.deleteFile(id)
  await User.removeUploadFile(user_id, id)
  ctx.body = {
    success: result
  }
}

const updateFile = async(ctx) => {
  // 更新文件
  /*
    info: {
      fileName: String, //文件名 可修改
      summary: String,  //文件摘要 可修改
      title: String,  //文件标题 可修改
      acadamy: String,  //文件学院 可修改
      objectType: Number,  //文件类型(笔记/课件) 可修改,
    }
    this.$http.post('/api/updatefile',{
      id: xxxx,
      info: {
        fileName: String, //文件名 可修改
        summary: String,  //文件摘要 可修改
        title: String,  //文件标题 可修改
        acadamy: String,  //文件学院 可修改
        objectType: Number,  //文件类型(笔记/课件) 可修改
      }
    })
  */
  const tokenUserid = ctx.tokenUserid
  let {id, info} = ctx.request.body
  if(!id || !info || id != tokenUserid) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }
  let result = await File.updateFileInfo(id, info)
  
  ctx.body = {
    success: result
  }
}

const findFileByBlurry = async(ctx) => {
  // 按模糊查找文件
  /*
    keywords: String,
    fields: ['fileName', 'summary', 'title', 'acadamy'] 或 []
    this.$http.post('/api/getfilebyblurry',{
      keywords: 'xxxx',
      fields: ['xxx','xxx']
    })
  */
  let keywords = ctx.request.body.keywords
  let fields = ctx.request.body.fields
  
  if(!keywords) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }
  let result = await File.getFileListByBlurry(keywords, fields)

  ctx.body = {
    success: true,
    data: result
  }
}

const collectFile = async(ctx) => {
  // 收藏文件
  /**
   * file_id
   * user_id
   */
  const tokenUserid = ctx.tokenUserid
  let obj = ctx.request.body
  if(!obj.file_id || !obj.user_id) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }
  await File.increaseFileCollect(obj.file_id)
  await User.updateUserCollectList(obj.user_id, obj.file_id)

  ctx.body = {
    success: true
  }
}

const uncollectFile = async(ctx) => {
  //取消收藏文件
  /**
   *  file_id,
   *  user_id
   */

  const tokenUserid = ctx.tokenUserid
  let obj = ctx.request.body
  if(!obj.file_id || !obj.user_id ) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }
  await File.decreaseFileCollect(obj.file_id)
  await User.removeCollectFile(obj.user_id, obj.file_id)

  ctx.body = {
    success: true
  }
}


module.exports = {
  getFile,
  getFileByAcadamy,
  getFileByAuthor,
  getFileByids,
  addFile,
  deleFile,
  updateFile,
  findFileByBlurry,
  downloadFile,
  setInfo,
  deleFile,
  collectFile,
  uncollectFile
}
