const Answer = require('../schemas/answer')

const addAnswer = async(answer) => {
  const answerResult = await Answer.create(answer)
  if (!answerResult) {
    console.error(e)
    return false
  }
  return answerResult
}

const deleteAnswer = async(id) => {
  try {
    const result = await Answer.findByIdAndRemove(id)
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

const getAnswerByid = async(id) => {
  return await Answer.findById(id) || undefined
}

const getAnswersByids = async(ids) => {
  try {
    const answerList = await Answer.find({_id: {$in: ids}})
    return answerList || []
  } catch (e) {
    console.error(e)
    return []
  }
}

const getAnswersByBlurry = async(cond) => {
  try {

    let reg = new RegExp(cond, 'i')
    
    const result = await Answer.find({
      detail: {$regex: reg}
    })
    
    return result || []
  } catch (e) {
    return []
  }
}

const getAnswersByAuthorid = async(id) => {
  try {
    const answerList = await Answer.find({
      author_id: id
    })
    return answerList || []
  } catch (e) {
    return []
  }
}

const approveAnswer = async(id) => {
  try {
    await Answer.findByIdAndUpdate(id, {
      $inc: {approve: 1}
    }) 
  } catch (e) {
    return false
  }
}

const cancelApproveAnswer = async(id) => {
  try {
    await Answer.findByIdAndUpdate(id, {
      $inc: {approve: -1}
    }) 
  } catch (e) {
    return false
  }
}

const againstAnswer = async(id) => {
  try {
    await Answer.findByIdAndUpdate(id, {
      $inc: {against: 1}
    }) 
  } catch (e) {
    return false
  }
}

const cancelAgainstAnswer = async(id) => {
  try {
    await Answer.findByIdAndUpdate(id, {
      $inc: {against: -1}
    }) 
  } catch (e) {
    return false
  }
}

module.exports = {
  addAnswer,
  deleteAnswer,
  getAnswerByid,
  getAnswersByids,
  getAnswersByBlurry,
  getAnswersByAuthorid,
  approveAnswer,
  cancelApproveAnswer,
  againstAnswer,
  cancelAgainstAnswer
}
