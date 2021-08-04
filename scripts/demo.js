const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const configFactory = require('../config/webpack.demo');

const webpackDevServerConfig = {
  contentBase: 'demo/public',
  hot: true,
  filename: 'bundle.js',
  stats: {
    colors: true,
  },
};

const compiler = webpack(configFactory);

const devServer = new WebpackDevServer(compiler, webpackDevServerConfig);

devServer.listen(9999, 'localhost', (error) => {
  if (error) {
    return console.log(error);
  }
});
