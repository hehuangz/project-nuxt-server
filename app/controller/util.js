const svgCaptcha = require('svg-captcha');
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async captcha() {
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
}

module.exports = HomeController;
