const md5 = require('md5')
const BaseController = require('./base')

const HashSalt = '>0<hehuangz^#^' // 暂时写死

const createRule = {
  email: {type: 'email'},
  nickname: {type: 'string'},
  pwd: {type: 'string'},
  captcha: {type: 'string'}
}

class UserController extends BaseController {
  async login() {
   
  }

  async register() {
    const { ctx } = this
    try {
      ctx.validate(createRule)
    } catch (e) {
      return this.error('参数校验失败', -1, e.errors)
    }

    const {email, pwd, captcha, nickname} = ctx.request.body
    if (captcha.toUpperCase() !== ctx.session.captcha.toUpperCase()) {
      return this.error('验证码错误')
    }

    if (await this.checkEmail(email)) {
      this.error('邮箱重复了，请更换邮箱')
    } else {
      const ret = await ctx.model.User.create({
        email,
        nickname,
        pwd: md5(pwd + HashSalt),
      })
      if (ret._id) {
        this.message('注册成功')
      }
    }
  }

  async checkEmail (email) {
    const user = await this.ctx.model.User.findOne({ email })
    return user
  }

  async info() {
   
  }

  async verify() {
   
  }
}

module.exports = UserController;
