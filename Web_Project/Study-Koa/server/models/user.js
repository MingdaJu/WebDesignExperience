const User = require('../schemas/user')

const addUser = async(obj) => {
  try {

    let userExist = await User.find({ name: obj.name })
    
    if (userExist.length > 0) {
      return {
        success: false,
        msg: '用户名已被使用'
      }
    } else {
      const result = await User.create(obj)
      return {
        success: true,
        user: result
      }
    }
  } catch (e) {
    return {
      success: false,
      msg: '未知错误'
    }
  }
}

const deleteUser = async(id) => {
  try {
    await User.findByIdAndRemove(id)
    return true
  } catch (e) {
    return false
  }
}

const updateUser = async(obj) => {
  const id = obj.id
  const name = obj.name
  try {
    const result = await User.findByIdAndUpdate(id, {
      name
    })
    return true
  } catch (e) {
    return false
  }
}

const getUserList = async() => {
  try {

    const userList = await User.find({}, {
      name: 1
    }, {
      sort: '-updateAt'
    })
    return userList || []
  } catch (e) {
    return []
  }
}

const getUserById = async(id) => {
  try {
    const user = await User.findById(id)
    return user || undefined
  } catch (e) {
    return undefined
  }
}

const updateUserCollectList = async(user_id, file_id) => {
  //console.log(user_id,file_id)
  try {
    const result = await User.findByIdAndUpdate(user_id, {
      $push: { collectFileidList: file_id }
    })
    return true
  } catch (e) {
    return false
  }
}

const updateUserDownloadList = async(user_id, file_id) => {
  try {
    const result = await User.findByIdAndUpdate(user_id, {
      $push: { downloadFileidList: file_id }
    })
    return true
  } catch (e) {
    return false
  }
}

const updateUserUploadList = async(user_id, file_id) => {
  try {
    const result = await User.findByIdAndUpdate(user_id, {
      $push: { uploadFileidList: file_id }
    })
    return true
  } catch (e) {
    return false
  }
}

const removeUploadFile = async(user_id, file_id) => {
  try {
    //let uploadList = await User.findById(user_id).uploadFileidList
    //console.log(uploadList)
    //uploadList.filters((el) => { return el !== file_id })
    await User.findByIdAndUpdate(user_id, {
      $pull: {uploadFileidList: file_id}
    })
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

const removeCollectFile = async(user_id, file_id) => {
  try {
    //let collectList = await User.findById(user_id).collectFileidList
    //console.log(collectList)
    //collectList.filters((el) => { return el !== file_id })
    //console.log(typeof file_id,file_id)
    await User.findByIdAndUpdate(user_id, {
      $pull: {collectFileidList: file_id}
    })
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

const getUserByName = async(name) => {
  try {
    const user = await User.findOne({
      name: name
    })
    return user || undefined
  } catch (e) {
    return undefined
  }
}

const auth = async(id) => {
  try {
    await User.findByIdAndUpdate(id, {
      isAuth: true
    })
    return true
  } catch (e) {
    return false
  }
}

const publishIssue = async(userid, issueid) => {
  try {
    await User.findByIdAndUpdate(userid, {
      $push: {issueList: issueid}
    })
    return true
  } catch (e) {
    return false
  }
}

const watchIssueByid = async(userid, issueid) => {
  console.log("user watch issue",userid, issueid)
  try {
    
    let user = await User.findByIdAndUpdate(userid, {
      $push: {watchIssueList: issueid}
    })
    console.log(user)
    return true
  } catch (e) {
    return false
  }
}

const cancelWatchIssue = async(userid, issueid) => {
  try {
    await User.findByIdAndUpdate(userid, {
      $pull: {watchIssueList: issueid}
    })
    return true
  } catch (e) {
    return false
  }
}

const approveAnswer = async(userid, answerid) => {
  try {
    await User.findByIdAndUpdate(userid, {
      $push: {approveList: answerid}
    })
    return true
  } catch (e) {
    return false
  }
}

const againstAnswer = async(userid, answerid) => {
  try {
    await User.findByIdAndUpdate(userid, {
      $push: {againstList: answerid}
    })
    return true
  } catch (e) {
    return false
  }
}

const cancelApproveAnswer = async(userid, answerid) => {
  try {
    await User.findByIdAndUpdate(userid, {
      $pull: {approveList: answerid}
    })
    return true
  } catch (e) {
    return false
  }
}

const cancelAgainstAnswer = async(userid, answerid) => {
  try {
    await User.findByIdAndUpdate(userid, {
      $pull: {againstList: answerid}
    })
    return true
  } catch (e) {
    return false
  }
}



const publishAnswer = async(userid, answerid) => {
  try {
    await User.findByIdAndUpdate(userid, {
      $push: {answerList: answerid}
    })
    return true
  } catch (e) {
    return false
  }
}

const deleteAnswer = async(userid, answerid) => {
  try {
    await User.findByIdAndUpdate(userid, {
      $pull: {answerList: answerid}
    })
    return true
  } catch (e) {
    return false
  }
}

module.exports = {
  addUser,
  getUserList,
  deleteUser,
  updateUser,
  getUserById,
  getUserByName,
  updateUserCollectList,
  updateUserDownloadList,
  updateUserUploadList,
  removeUploadFile,
  removeCollectFile,
  auth,
  publishIssue,
  watchIssueByid,
  cancelWatchIssue,
  approveAnswer,
  cancelApproveAnswer,
  cancelAgainstAnswer,
  againstAnswer,
  publishAnswer,
  deleteAnswer
}