const auth = require('../controllers/auth')
const router = require('koa-router')()

router.get('authMail', auth.mailAuthCheck)
router.post('sendMailAgain', auth.sendEmailAgain)

module.exports = router