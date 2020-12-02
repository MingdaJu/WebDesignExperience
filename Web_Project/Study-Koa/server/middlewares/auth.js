const JWT = require('../config/jwt')

const auth = async(ctx, next) => {
  // let tokenUserid = JWT.verifyToken(ctx.request.headers.token)
  // if (!tokenUserid) {
  //   ctx.body = {
  //     success: false,
  //     msg: 'Token已过期，请重新登录！'
  //   }
  //   return
  // }
  // ctx.tokenUserid = tokenUserid
  await next()
}

module.exports = {
  auth
}