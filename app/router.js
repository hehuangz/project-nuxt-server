'use strict';

const { Controller } = require("egg");

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/captcha', controller.util.captcha);
  router.get('/sendcode', controller.util.captcha);
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
    router.post('/info', info)
    router.post('/login', login)
    router.post('/register', register)
    router.post('/verify', verify)
  })
};
