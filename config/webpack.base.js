const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const paths = require('./path');

module.exports = {
  /**
   * @param entry
   *
   * 入口文件 src/index.js
   */
  entry: paths.src + '/index.js',

  /**
   * @param output
   *
   * 输出文件 告诉 webpack在哪里输出它创建的 bundle
   */
  output: {
    path: paths.dist,
    filename: '[name]-[contenthash].js',
  },

  /**
   * @param module
   *
   * 在webpack配置中 loader 主要有2个属性
   *
   * @method test 识别出哪些文件会被转换
   *
   * @method use 定义在进行转换时，应该使用哪个 loader
   */
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },

  /**
   * @param plugins
   *
   * webpack 插件模块
   */
  plugins: [
    new UglifyJsPlugin({
      parallel: true,
      sourceMap: true,
    }),
  ],
};
