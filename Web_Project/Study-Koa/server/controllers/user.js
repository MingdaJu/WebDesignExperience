const User = require('../models/user')
const sendAuthMail = require('./auth').sendEmailAuth
const JWT = require('../config/jwt')

const deleUser = async(ctx) => {
  //todo 删除用户
  ctx.body = {
    data: 'nothing'
  }
}

const updateUser = async(ctx) => {
  //todo更新用户
  ctx.body = {
    data: 'nothing'
  }
}

const findUserById = async(ctx) => {
  /**
   * this.get('/api/user?user_id=xxxx')
   */

  let id = ctx.query.user_id
  if(!id) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }

  const user = await User.getUserById(id)

  ctx.body = {
    success: true,
    data: user
  }
}

const findUserByName = async(ctx) => {
  /**
   * userName 
   */

  let name = ctx.request.body.userName
  if(!name) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }

  const user = await User.getUserByName(name)

  ctx.body = {
    success: true,
    data: user
  }
}

const login = async(ctx) => {
  /**
   * name,
   * psd
   */
  let name = ctx.request.body.name
  let psd = ctx.request.body.psd
  if(!name || !psd) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }
  let user = await User.getUserByName(name)
  if (user === undefined) {
    ctx.body = {
      success: false,
      msg: '用户不存在'
    }
  } else if (psd !== user.psd) {
    ctx.body = {
      success: false,
      msg: '密码错误'
    }
  } else {
    ctx.body = {
      success: true,
      data: {
        user: user
      },
      token: JWT.createToken(user._id) 
    }
  }
}

const register = async(ctx) => {
  /**
   * name,
   * psd,
   * email,
   * studentID
   */
  const obj = ctx.request.body
  if(!obj.name || !obj.psd || !obj.studentID) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }
  const result = await User.addUser(obj)

  if (result.success) {
    // await sendAuthMail({
    //   user_id: result.user._id,
    //   userName: result.user.name,
    //   mail: obj.email
    // })
    // fake
    User.auth(result.user.id)
    result.user.isAuth = true
    ctx.body = {
      success: true,
      data: {
        user: result.user
      },
      token: JWT.createToken(result.user._id) 
    }
  } else {
    ctx.body = {
      success: false,
      msg: result.msg
    }
  }
}

const uploadFile = async(ctx) => {
  /**
   * user_id,
   * file_id
   */

  let obj = ctx.request.body
  if(!obj.user_id || !obj.file_id) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }

  if (await User.updateUserUploadList(obj.user_id, obj.file_id)) {
    ctx.body = {
      success: true
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}

const collectFile = async(ctx) => {
  /**
   * user_id,
   * file_id
   */

  let obj = ctx.request.body
  if(!obj.user_id || !obj.file_id) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }

  if (await User.updateUserCollectList(obj.user_id, obj.file_id)) {
    ctx.body = {
      success: true
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}

const downloadFile = async(ctx) => {
  /**
   * user_id,
   * file_id
   */

  let obj = ctx.request.body
  if(!obj.user_id || !obj.file_id) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }

  if (await User.updateUserDownloadList(obj.user_id, obj.file_id)) {
    ctx.body = {
      success: true
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}

const uncollectFile = async(ctx) => {
  let obj = ctx.request.body
  if(!obj.user_id || !obj.file_id) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }

  await User.removeCollectFile(obj.user_id, obj.file_id)

  ctx.body = {
    success: true
  }
}

const removeUploadFile = async(ctx) => {
  let obj = ctx.request.body
  if(!obj.user_id || !obj.file_id) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }

  await User.removeUploadFile(obj.user_id, obj.file_id)

  ctx.body = {
    success: true
  }
}

module.exports = {
  deleUser,
  updateUser,
  findUserById,
  findUserByName,
  login,
  register,
  uploadFile,
  collectFile,
  downloadFile,
  uncollectFile,
  removeUploadFile
}