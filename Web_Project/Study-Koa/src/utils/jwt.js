const encodeManage = require('../utils/code')

const setJwt = (req, next) => {
  const token = localStorage.getItem('token') || ''
  req.headers.set('token', token)
  next(JwtHandle)
}

const JwtHandle = (res) => {
  if (res.body.token) {
    localStorage.setItem('token', res.body.token)
    delete res.body.token
  }
}

export default { JwtHandle, setJwt }