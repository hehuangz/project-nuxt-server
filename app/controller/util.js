const svgCaptcha = require('svg-captcha');
const fse = require('fs-extra')
const path = require('path')
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
    // 文件一次性上传方式
    // const { ctx } = this
    // const file = ctx.request.files[0]
    // await fse.move(file.filepath, this.config.UPLOAD_DIR+'/'+file.filename)
    // this.success({
    //   url: `public/${file.filename}`
    // })

    // 切片上传方式
    const { ctx } = this
    const file = ctx.request.files[0]
    const { hash, name } = ctx.request.body
    const chunkPath = path.resolve(this.config.UPLOAD_DIR, hash)
    if (!fse.existsSync(chunkPath)) {
      await fse.mkdir(chunkPath)
    }
    await fse.move(file.filepath, `${chunkPath}/${name}`)
    this.message('切片上传成功')
  }

  async mergeFile () {
    const { ext, size, hash } = this.ctx.request.body
    const filePath = path.resolve(this.config.UPLOAD_DIR, `${hash}.${ext}`)
    await this.ctx.service.tools.mergeFile(filePath, hash, size)
    this.success({
      url: `/public/${hash}.${ext}`
    })
  }
}

module.exports = HomeController;
