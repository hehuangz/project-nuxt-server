const svgCaptcha = require('svg-captcha');
const fse = require('fs-extra')
const BaseController = require('./base')

class HomeController extends BaseController {
  async captcha () {
    const captcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1i',
      noise: 3,
      color: true
    });
    this.ctx.session.captcha = captcha.text
    this.ctx.response.type = "image/svg+xml"
    this.ctx.body = captcha.data
  }

  async uploadFile () {
    const { ctx } = this
    const file = ctx.request.files[0]
    await fse.move(file.filepath, this.config.UPLOAD_DIR+'/'+file.filename)
    this.success({
      url: `public/${file.filename}`
    })
  }
}

module.exports = HomeController;
