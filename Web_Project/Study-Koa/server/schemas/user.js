const mongoose = require('../config')

const Schema = mongoose.Schema

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  studentID: {
    type: String,
    required: true
  },
  // email: {
  //   type: String,
  //   required: true
  // },
  // type: {
  //   type: String,
  //   default: 'student'
  // },
  psd: {
    type: String,
    required: true
  },
  collectFileidList: {
    type: Array,
    default: []
  },
  downloadFileidList: {
    type: Array,
    default: []
  },
  uploadFileidList: {
    type: Array,
    default: []
  },
  isAuth: {
    type: Boolean,
    default: false
  },
  issueList: {
    type: Array,
    default: []
  },
  watchIssueList: {
    type: Array,
    default: []
  },
  approveList: {
    type: Array,
    default: []
  },
  againstList: {
    type: Array,
    default: []
  },
  answerList: {
    type: Array,
    default: []
  }
}, {
  versionKey: false,
  timestamps: true
})

module.exports = mongoose.model('user', User)