const User = require('../models/user')

const nodemailer = require('nodemailer')
const moment = require('moment')

const codeUtil = require('../utils/code')

const sendEmailAuth = async(body) => {
  /**
   * user_id,
   * userName
   * mail
   */
  const authCode = geneMailAuthcode(body.user_id)
  if(!authCode) {
    return false
  }
  try{
    const mailTransport = nodemailer.createTransport({
      host: 'smtp.163.com',
      secureConnection: true,
      port: 465,
      auth: {
        user: 'studyKoa',
        pass: '2017study'
      }
      //163邮箱账号：studyKoa@163.com;密码：study2017；授权码：2017study
    });

    const mailOptions = {
      from: 'studyKoa@163.com',
      to: body.mail,
      subject: '一起学吧在线学习社区邮箱验证',
      html: `尊敬的<strong>${body.userName}</strong>：
              <div>&nbsp;&nbsp;&nbsp;&nbsp;请<span style="color: #f54907">在24小时内复制链接到地址栏并打开</span>进行服务系统的身份验证：${process.env.APP_URL}/auth${authCode}<div>
              </br>
              <div>感谢使用一起学吧在线学习社区！</div>
              <center>
                ------------by 一起学吧团队------------
              </center>`
    }

    await mailTransport.sendMail(mailOptions, (err, msg) => {
      if (err) {
        console.error(err)
      }
      mailTransport.close()
    })

    return true
  } catch (e) {
    return false
  }
}

const geneMailAuthcode = (id) => {
  try {
    id = id.toString()
    const now = moment().format('YYYY-MM-DD HH:mm:ss')
    return `?code=${codeUtil.encodeBase64(codeUtil.encodeHex(id))}&time=${codeUtil.encodeBase64(codeUtil.encodeHex(now))}`
  } catch(e) {
    return false
  }
}

const mailAuthCheck = async(ctx) => {
  /**
   * code
   * time
   */

  /**
   * this.$http.get(`/api/authMail?code=${this.code}&time=${this.time}`)
     .then(res => {
       if (res.body.success){

       } else {
         this.$message.error(res.body.msg)
       }
     })
   */

  const code = ctx.query.code
  const time = ctx.query.time
  if (!code || !time) {
    ctx.body = {
      success: false,
      msg: '验证链接无效'
    }
    return
  } else {
    const user_id = codeUtil.decodeHex(codeUtil.decodeBase64(code))
    const thatTime = codeUtil.decodeHex(codeUtil.decodeBase64(time))
    if(!user_id || !thatTime) {
      ctx.body = {
        success: false,
        msg: '错误链接'
      }
      return
    }
    const diff = moment().diff(thatTime, 'hours')

    if (diff < 24) {
      await User.auth(thatTime)

      ctx.body = {
        success: true,
        msg: '验证成功'
      }
      return
    } else {
      ctx.body = {
        success: false,
        msg: '链接已失效'
      }
      return
    }
  }
}

const sendEmailAgain = async(ctx) => {
  /**
   * code
   */
  let code = ctx.request.body.code
  if(!code) {
    ctx.body = {
      success: false,
      msg: '验证码错误'
    }
    return
  } 
  const user_id = codeUtil.decodeHex(codeUtil.decodeBase64(code))
  const user = await User.getUserById(user_id)

  if (!user) {
    ctx.body = {
      success: false,
      msg: '用户不存在'
    }
  } else {
    await sendEmailAuth({
      user_id: user_id,
      userName: user.name,
      mail: user.email
    })
    ctx.body = {
      success: true,
      msg: '邮件已发送'
    }
  }
}

module.exports = {
  sendEmailAuth,
  mailAuthCheck,
  sendEmailAgain
}