const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')

function mkdirsSync( dirname ) {
  if (fs.existsSync( dirname )) {
    return true
  } else {
    if (mkdirsSync( path.dirname(dirname)) ) {
      fs.mkdirSync( dirname )
      return true
    }
  }
}

function getSuffixName( fileName ) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}

function uploadFile( ctx, options) {
  try {

    let req = ctx.req
    let res = ctx.res
    let busboy = new Busboy({headers: req.headers})
    
    let fileType = options.fileType || 'common'
    let filePath = path.join(options.path, fileType)
    let mkdirResult = mkdirsSync( filePath )
    
    return new Promise((resolve, reject) => {
      let result = { 
        success: false
      }
      
      busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        //重命名文件
        let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
        let _uploadFilePath = path.join( filePath, fileName )
        let saveTo = path.join(_uploadFilePath)
        let dataSize = 0
        //saveTo为文件存储url
        
        file.on('data', function(data) {
          dataSize = data.length / 1024
        })
        file.pipe(fs.createWriteStream(saveTo))
        
        file.on('end', function() {
          result.success = true
          result.message = '文件上传成功'
          result.fileName = filename
          result.fileUrl = path.join(fileType, fileName)
          result.fileType = getSuffixName(filename)
          result.lastModified = (new Date()).toLocaleString()
          result.size = dataSize.toFixed(2)
          
          resolve(result)
        })
      })
      
      busboy.on('finish', function( ) {
        resolve(result)
      })
      
      busboy.on('error', function(err) {
        result.message = '文件上传失败'
        reject(result)
      })
      
      req.pipe(busboy)
    })
  } catch (e) {
    console.error(e)
    return false
  }
} 

module.exports =  {
  uploadFile
}