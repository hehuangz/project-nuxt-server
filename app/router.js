'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt({ app })
  router.get('/', controller.home.index);
  router.get('/captcha', controller.util.captcha);
  router.get('/sendcode', controller.util.captcha);
  
  // 文件上传
  router.post('/uploadFile', controller.util.uploadFile);
  // 合并文件
  router.post('/mergeFile', controller.util.mergeFile);
  // 检查是否已经上传
  router.post('/checkFile', controller.util.checkFile);
  
  router.group({ 
    name: 'user',
    prefix: '/user'
  }, router => {
    const {
      info,
      login,
      register,
      verify
    } = controller.user
    router.post('/login', login)
    router.post('/register', register)
    router.post('/verify', verify)

    router.get('/info', jwt, info)
  })
};
