'use strict';

const PROXY_DOMAIN = require('./paths').PROXY_DOMAIN;
const PROXY_PORT   = require('./paths').PROXY_PORT;
const PROXY_TARGET = require('./paths').PROXY_TARGET;
const PUBLIC_PATH  = require('./paths').PUBLIC_PATH;

const WebpackDevServer = require('webpack-dev-server');
const config           = require('./dev.config.js');
const webpack          = require('webpack');

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
  proxy      : { '*': PROXY_TARGET },
  hot        : true,
  inline     : true,
  quiet      : false,
  noInfo     : false,
  publicPath : `http://${PROXY_DOMAIN}:${PROXY_PORT}${PUBLIC_PATH}`,
  stats      : { colors: true }
});

server.listen(PROXY_PORT, PROXY_DOMAIN, () => {
  console.info(`WebpackDevServer running on http://${PROXY_DOMAIN}:${PROXY_PORT}`);
});
