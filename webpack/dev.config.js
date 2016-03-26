'use strict';

const PROXY_DOMAIN = require('./paths').PROXY_DOMAIN;
const PROXY_PORT   = require('./paths').PROXY_PORT;
const PUBLIC_PATH  = require('./paths').PUBLIC_PATH;
const SRC_PATH     = require('./paths').SRC_PATH;
const TMPL_PATH    = require('./paths').TMPL_PATH;

const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const webpack               = require('webpack');
const config                = require('./common.config');

config.entry.common = [
  `webpack-dev-server/client?http://${PROXY_DOMAIN}:${PROXY_PORT}`,
  'webpack/hot/only-dev-server'
].concat(config.entry.common);

config.output.publicPath = PUBLIC_PATH;

config.module.loaders.push({

  test    : /\.scss$/,
  loader  : 'style!css!sass?sourceMap!postcss',
  include : SRC_PATH

});

config.plugins = [
  new WebpackNotifierPlugin(),
  new HtmlWebpackPlugin({
    template : TMPL_PATH,
    filename : 'index.html',
    title    : 'Dev Mode'
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
];

module.exports = config;
