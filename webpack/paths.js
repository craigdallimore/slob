'use strict';

const path = require('path');

module.exports = {
  PROXY_DOMAIN : 'localhost',
  PROXY_PORT   : 3333,
  PROXY_TARGET : 'http://127.0.0.1:8080', // The real server, not WDS.
  PUBLIC_PATH  : '/',
  TMPL_PATH    : path.join(__dirname, '../src/template/index.ejs'),
  SRC_PATH     : path.join(__dirname, '../src')
};
