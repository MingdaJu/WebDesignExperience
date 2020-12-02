const File = require('../schemas/file')

const addFile = async(obj) => {
  // 添加文件
  const result = await File.create(obj)
  return result._id
}

const deleteFile = async(id) => {
  //删除文件
  try{
    const result = await File.findByIdAndRemove(id)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

const setFileInfo = async(id, info) => {
  // 添加文件信息
  try {
    const result = await File.findByIdAndUpdate(id, {
      title: info.name,
      acadamy: info.acadamy,
      objectType: info.objectType,
      author_id: info.author_id,
      summary: info.summary
    })
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

const updateFileInfo = async(id, info) => {
  // 添加文件信息
  try {
    const result = await File.findByIdAndUpdate(id, info)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

const getFileList = async() => {
  // 获取所有文件列表
  try {   
    
    const fileList = await File.find({}, {}, {
      sort: '-updateAt'
    })
    return fileList || []
  } catch (e) {
    return false
  }
}

const getFileListByBlurry = async(keywords, fields) => {
  //模糊查询文件列表
  let reg = new RegExp(keywords,'i')
  let opt = []
  
  if(fields.length > 0) { 
    fields.forEach(el => {
      opt.push({[el]: {$regex: reg}}) 
    });
  } else {
    opt = [
      {fileName: {$regex: reg}},
      {summary: {$regex: reg}},
      {title: {$regex: reg}},
      {acadamy: {$regex: reg}}
    ]
  }
  const result = await File.find({
      $or: opt
    },{},{
      sort: '-updateAt'
    })
  return result || []
}

const getFileListByCond = async(cond) => {
  // 根据条件获取文件列表
  try {   
    const fileList = await File.find(cond, {}, {
      sort: '-updateAt'
    })
    return fileList || []
  } catch (e) {
    console.error(e)
    return false
  }
}

const getFileListByids = async(idList) => {
  // 根据文件id数组获取文件
  try {
    const fileList = await File.find({_id: {$in: idList}})

    return fileList || []
  } catch (e) {
    console.error(e)
  }
}

const increaseFileDownload = async(id) => {
  // 增加下载量
  try {
    const result = await File.findByIdAndUpdate(id, {$inc: {download: 1}})
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

const increaseFileCollect = async(id) => {
  // 增加收藏量
  try {
    const result = await File.findByIdAndUpdate(id, {$inc: {collect: 1}})
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

const decreaseFileCollect = async(id) => {
  // 减少收藏量
  try {
    const result = await File.findByIdAndUpdate(id, {$inc: {collect: -1}})
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

module.exports = {
  addFile,
  deleteFile,
  getFileList,
  getFileListByCond,
  getFileListByids,
  setFileInfo,
  updateFileInfo,
  increaseFileDownload,
  increaseFileCollect,
  decreaseFileCollect,
  getFileListByBlurry
}