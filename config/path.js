const path = require('path');

module.exports = {
  /**
   * @param src
   *
   * 源码目录
   */
  src: path.resolve(__dirname, '../src'),

  /**
   * @param build
   *
   * 打包目录
   */
  build: path.resolve(__dirname, '../build'),

  /**
   * @param dist
   *
   * 生成代码目录
   */
  dist: path.resolve(__dirname, '../dist'),
};
