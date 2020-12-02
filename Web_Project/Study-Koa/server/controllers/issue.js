const Issue = require('../models/issue')
const Answer = require('../models/answer')
const User = require('../models/user')
const uploadfile = require('../utils/uploadFile').uploadFile
const path = require('path')
require('dotenv').config({ silent: true })

const getIssue = async(ctx) => {
  //获取全部问题列表
  /**
   * this.$http.get('/api/issue')
   */

   let issueList = await Issue.getAllIssue()

   ctx.body = {
     success: true,
     data: issueList
   }
}

const addIssue = async(ctx) => {
  //添加问题 这里发布问题，你只要传个issue对象
  /**
   * issue: {
   *  title: 标题
   *  detail: 描述,
   *  acadamy
   *  author_id,
   *  authorName
   * }
   * this.$http.post('/api/addIssue', {issue: {}})
   */
  const tokenUserid = ctx.tokenUserid
  let obj = ctx.request.body.issue
  if(!obj || !obj.author_id) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }
  obj = Object.assign(obj, {
    publishTime: new Date().toLocaleString(),
    watcher: 0,
    watchersid: [],
    answers: 0,
    answersId: []
  })
  const issueid = await Issue.addIssue(obj)
  await User.publishIssue(obj.author_id, issueid)
  if (issueid){
    ctx.body = {
      success: true
    }
    await User.publishIssue(issueid)
  } else {
    ctx.body = {
      success: false,
      msg: '发布问题失败'
    } 
  }
}

const deleIssue = async(ctx) => {
  //删除问题1
  /**
   * this.$http.get('/api/deleteIssue?id=xxxx')
   */
  const tokenUserid = ctx.tokenUserid
  const issueid = ctx.query.id
  if(!issueid) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }
  if((await Issue.getIssueByid(issueid)).author_id !== tokenUserid) {
    ctx.body = {
      success: false,
      msg: '用户错误'
    }
    return
  }
  await Issue.deleteIssue(issueid)

  ctx.body = {
    success: true
  }
}

const updateIssue = async(ctx) => {
  //更新问题1
  /**
   * id: xxx,
   * info: {
   *  title: xxx,
   *  detail: xxx
   * }
   */
  const tokenUserid = ctx.tokenUserid
  let {id, info} = ctx.request.body
  if(!id || !info) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }
  if((await Issue.getIssueByid(id)).author_id !== tokenUserid) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }
  await Issue.updateIssue(id, info)

  ctx.body = {
    success: true
  }
}

const findIssueByUser = async(ctx) => {
  /**
   * this.$http.get('/api/getissuebyauthor?authorid=xxxx')1
   */
  const tokenUserid = ctx.tokenUserid
  const authorid = ctx.query.authorid
  if(!authorid || authorid !== tokenUserid) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }

  const issueList = await Issue.getIssueListByAuthor(authorid)
  ctx.body = {
    success: true,
    data: issueList
  }
}

const findIssueByBlurry = async(ctx) => {
  /**
   * this.$http.get('/api/findIssueBlurry?cond=xxxxx')1
   */
  const cond = ctx.query.cond
  if(!cond) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }
  const issueList = await Issue.getIssuesByBlurry(cond)
  
  ctx.body = {
    success: true,
    data: issueList
  }
}

const getIssueByid = async(ctx) => {
  /**
   * this.get('/api/getIssueByid?id=xxxx')
   */

   const id = ctx.query.id
   if(!id) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
   }

   const result = await Issue.getIssueByid(id)

   ctx.body = {
     success: true,
     data: result
   }
}

const getIssuesByids = async(ctx) => {
  /**2
   * ids: []
   */
  const ids = ctx.request.body.ids
  if(!ids) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }
  const issueList = await Issue.getIssuesByids(ids)

  ctx.body = {
    success: true,
    data: issueList
  } 
}

const getAnswersByids = async(ctx) => {
  /**1
   * ids: []
   */
  const ids = ctx.request.body.ids
  if(!ids) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }
  const answersList = await Answer.getAnswersByids(ids)

  ctx.body = {
    success: true,
    data: answersList
  }  
}

const watchIssue = async(ctx) => {
  /**
   * this.$http.get('/api/watchIssue?userid=xxxxx&issueid=xxxxx')1
   */
  const tokenUserid = ctx.tokenUserid
  const {userid, issueid} = ctx.query
  if(!userid || !issueid){
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }

  if(await Issue.increaseWatcher(issueid, userid) && await User.watchIssueByid(userid, issueid)) {
    ctx.body = {
      success: true
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}

const cancelWatchIssue = async(ctx) => {
 /**
   * this.$http.get('/api/cancelWatchIssue?userid=xxxxx&issueid=xxxxx')
   */
  const tokenUserid = ctx.tokenUserid
  const {userid, issueid} = ctx.query
  if(!userid || !issueid) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }

  if(await Issue.decreaseWatcher(issueid, userid)  && await User.cancelWatchIssue(userid, issueid)) {
    ctx.body = {
      success: true
    }
  } else {
    ctx.body = {
      success: false
    }
  } 
}

const publishAnswer = async(ctx) => {
  /**
   * answer: {
   *  issue: issueid,
   *  target: answerid || '',
   *  detail: String,
   *  author_id,
   *  authorName
   * }
   */

  const tokenUserid = ctx.tokenUserid
  const issue = await Issue.getIssueByid(ctx.request.body.answer.issue)
  if (!issue.title) {
    ctx.body = {
      success: false,
      msg: '问题不存在'
    }
    return
  }
  let answer = Object.assign(ctx.request.body.answer, {
    publishTime: new Date().toLocaleString(),
    issueTitle: issue.title
  })
  if(!answer.issue || !answer.author_id) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }

  const result = await Issue.addAnswer(answer.issue, answer)
  if (result) {
    await User.publishAnswer(answer.author_id, result)
    ctx.body = {
      success: true
    }
  } else {
    ctx.body = {
      success: false
    } 
  }
}

const deleteAnswer = async(ctx) => {
  /**
   * this.get('/api/deleteAnswer?userid=xxx&issueid=xxx&answerid=xxxx')
   */  
  const tokenUserid = ctx.tokenUserid
  const {userid, issueid, answerid} = ctx.query
  if(!userid || !issueid || !answerid) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }
  await Issue.deleteAnswer(issueid,answerid)
  await User.deleteAnswer(userid,answerid)

  ctx.body = {
    success: true
  }
}

const approveAnswer = async(ctx) => {
  /**
   * this.get('/api/approveAnswer?userid=xxx&answerid=xxx')
   */

  const tokenUserid = ctx.tokenUserid
  const {userid, answerid} = ctx.query
  if(!userid || !answerid) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }
  await Answer.approveAnswer(answerid)
  await User.approveAnswer(userid,answerid)

  ctx.body = {
    success: true
  }
}

const cancelApproveAnswer = async(ctx) => {
  /**
   * this.get('/api/cancelApproveAnswer?userid=xxx&answerid=xxx')
   */

  const tokenUserid = ctx.tokenUserid
  const {userid, answerid} = ctx.query
  if(!userid || !answerid) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }
  await Answer.cancelApproveAnswer(answerid)
  await User.cancelApproveAnswer(userid,answerid)

  ctx.body = {
    success: true
  }
}

const againstAnswer = async(ctx) => {
  /**
   * this.get('/api/againstAnswer?userid=xxx&answerid=xxx')
   */

  const tokenUserid = ctx.tokenUserid
  const {userid, answerid} = ctx.query
  if(!userid || !answerid) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }
  await Answer.againstAnswer(answerid)
  await User.againstAnswer(userid,answerid)

  ctx.body = {
    success: false
  }
}

const cancelAgainstAnswer = async(ctx) => {
  /**
   * this.get('/api/cancelAgainstAnswer?userid=xxx&answerid=xxx')
   */

  const tokenUserid = ctx.tokenUserid
  const {userid, answerid} = ctx.query
  if(!userid || !answerid) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return
  }
  await Answer.cancelAgainstAnswer(answerid)
  await User.cancelAgainstAnswer(userid,answerid)

  ctx.body = {
    success: false
  }
}

const addIssueImage = async(ctx) => {
  let result = await uploadfile(ctx, {
    fileType: 'issue',
    path: path.join(__dirname, '../','../','upload')
  })
  if(!result) {
    ctx.body = {
      success: false,
      msg: '参数错误'
    }
    return 
  }
  let imageUrl = result.fileUrl
  ctx.body = {
    imageUrl: process.env.API_URL + '/' + imageUrl,
    success: imageUrl.length === 0 ? false : true
  }
}

module.exports = {
  getIssue,
  addIssue,
  deleIssue,
  updateIssue,
  findIssueByUser,
  findIssueByBlurry,
  getIssueByid,
  getIssuesByids,
  getAnswersByids,
  watchIssue,
  cancelWatchIssue,
  publishAnswer,
  deleteAnswer,
  approveAnswer,    
  cancelApproveAnswer,
  againstAnswer,
  cancelAgainstAnswer,
  addIssueImage
}