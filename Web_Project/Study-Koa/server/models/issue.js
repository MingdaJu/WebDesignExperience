const Issue = require('../schemas/issue')
const Answer = require('./answer')
const User = require('./user')

const getAllIssue = async() => {
  return await Issue.find({}) || []
}

const addIssue = async(obj) => {
  //add issue
  try {
    const result = await Issue.create(obj)
    return result._id.toString()
  } catch (e) {
    return false
  }
}

const deleteIssue = async(id) => {
  //delete issue
  try {
    const result = await Issue.findByIdAndRemove(id)
    if(result) {
      result.answersId.forEach(async el => {
        await Answer.deleteAnswer(el)
      })
      result.watchersid.forEach(async el => {
        await User.cancelWatchIssue(el, result._id.toString())
      })
    }
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

const updateIssue = async(id, info) => {
  //modify issue: title,detail
  /**
   * info {
   *  title
   *  detail
   * }
   */

  try {
    const result = await Issue.findByIdAndUpdate(id, {
      title: info.title,
      detail: info.detail
    })
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

const increaseWatcher = async(id, userid) => {
  //increase watcher
  try {
    const result = await Issue.findByIdAndUpdate(id, {
      $inc: {watcher: 1},
      $push: {watchersid: userid}
    })
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

const decreaseWatcher = async(id, userid) => {
  //decrease watcher
  try {
    const result = await Issue.findByIdAndUpdate(id, {
      $inc: {watcher: -1},
      $pull: {watchersid: userid}
    })
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

const addAnswer = async(issueid, answer) => {
  // add answer
  /**
   * issueid: _id,
   * answer: answer object
   */

  try {
    const answerResult = await Answer.addAnswer(answer)
    const result = await Issue.findByIdAndUpdate(issueid, {
      $push: {answersId: answerResult._id.toString()},
      $inc: {answers: 1}
    })
    return answerResult._id.toString()
  } catch (e) {
    console.error(e)
    return false
  }
}

const deleteAnswer = async(issueid, answerid) => {
  // delete answer
  try {
    const result = await Issue.findByIdAndUpdate(issueid, {
      $pull: {answersId: answerid},
      $inc: {answers: -1}
    })
    await Answer.deleteAnswer(answerid)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

const getIssueByid = async(id) => {
  try {
    const result = await Issue.findById(id)
    
    return result || undefined
  } catch (e) {
    return undefined
  }
}

const getIssuesByids = async(ids) => {
  try {
    const issueList = await Issue.find({_id: {$in: ids}})

    return issueList || []
  } catch (e) {
    console.error(e)
    return []
  }
}

const getIssuesByBlurry = async(cond) => {
  try {

    let reg = new RegExp(cond, 'i')
    
    const result = await Issue.find({
      $or: [
        {title: {$regex: reg}},
        {detail: {$regex: reg}}
      ]
    })
    
    return result || []
  } catch (e) {
    return []
  }
}

const getIssueListByAuthor = async(userid) => {
  try {
    const result = await Issue.find({author_id: userid})
    
    return result || []
  } catch(e) {
    return []
  }
}

module.exports = {
  getAllIssue,
  addIssue,
  deleteIssue,
  updateIssue,
  increaseWatcher,
  decreaseWatcher,
  addAnswer,
  deleteAnswer,
  getIssueByid,
  getIssuesByids,
  getIssuesByBlurry,
  getIssueListByAuthor 
}


