'use strict';

const WebpackDevServer = require('webpack-dev-server');
const webpack          = require('webpack');
const config           = require('./webpack.config.js');

const PROXY_DOMAIN = 'localhost';
const PROXY_PORT   = 3333;
const PUBLIC_PATH  = '/';
const PROXY_TARGET = 'http://127.0.0.1:8080'; // The real server, not WDS.

config.entry.common = [
  `webpack-dev-server/client?http://${PROXY_DOMAIN}:${PROXY_PORT}`,
  'webpack/hot/dev-server'
].concat(config.entry.common);

config.output.publicPath = PUBLIC_PATH;

config.plugins.push(
  new webpack.HotModuleReplacementPlugin()
);

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
  proxy      : { '*': PROXY_TARGET },
  hot        : true,
  inline     : true,
  quiet      : true,
  noInfo     : false,
  publicPath : `http://${PROXY_DOMAIN}:${PROXY_PORT}${PUBLIC_PATH}`,
  stats      : { colors: true }
});

server.listen(PROXY_PORT, PROXY_DOMAIN, () => {
  console.info(`WebpackDevServer running on http://${PROXY_DOMAIN}:${PROXY_PORT}`);
});
