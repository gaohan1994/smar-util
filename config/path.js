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

  /**
   * @param demoEntry
   *
   * 测试入口文件
   */
  demoEntry: path.resolve(__dirname, '../demo/index.js'),

  /**
   * @param demoDist
   *
   * 测试生成文件
   */
  demoDist: path.resolve(__dirname, '../demo/public'),
};
