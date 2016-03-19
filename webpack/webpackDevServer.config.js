'use strict';

const WebpackDevServer = require('webpack-dev-server');
const webpack          = require('webpack');
const config           = require('./webpack.config.js');

const PROXY_DOMAIN = 'localhost';
const PROXY_PORT   = 3333;
const PUBLIC_PATH  = '/';
const PROXY_TARGET = 'http://127.0.0.1:8080';

config.entry.common = [
  `webpack-dev-server/client?http://${PROXY_DOMAIN}:${PROXY_PORT}`,
  'webpack/hot/dev-server',
  config.entry.common
];

config.plugins.push(
  new webpack.HotModuleReplacementPlugin()
);

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {

  // The address of the _ACTUAL_ served site - this is what will be proxied
  // by WebpackDevServer.
  contentBase : PROXY_TARGET,
  proxy       : { '*': PROXY_TARGET },
  hot         : true,
  inline      : true,
  quiet       : true,
  noInfo      : false,
  publicPath  : PUBLIC_PATH,
  stats       : { colors: true }
});

server.listen(PROXY_PORT, PROXY_DOMAIN, () => {
  console.info(`WebpackDevServer running on http://${PROXY_DOMAIN}:${PROXY_PORT}`);
});
