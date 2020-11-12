/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const path = require('path')
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1604561671929_9248';

  // 打开文件模式，允许上传任意文件
  config.multipart = {
    mode: 'file',
    whitelist: () => true
  }

  // 上传的文件目录配置
  config.UPLOAD_DIR = path.resolve(__dirname, '..', 'app/public')

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
    security: { // 暂时关闭
      csrf: {
        enable: false,
      }
    },
    mongoose: {
      client: {
        url: 'mongodb://127.0.0.1:27017/hehuanhub',
        options: {}
      }
    },
    jwt: {
      secret: 'hehuanZanShiDe'
    }
  };
};
