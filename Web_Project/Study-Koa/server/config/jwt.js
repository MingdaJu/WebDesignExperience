const JWT = require('jsonwebtoken')

const secret = 'studYauthcode'

const createToken = (userid) => {
  return JWT.sign({ userid: userid }, secret, { expiresIn: 5 * 60 * 60 })
}

const verifyToken = (token) => {
  try {
    let userid = JWT.verify(token, secret).userid
    return userid
  } catch (e) {
    return false
  }
}

module.exports = {
  createToken,
  verifyToken
}