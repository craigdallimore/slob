'use strict';

const WebpackNotifierPlugin  = require('webpack-notifier');
const HtmlWebpackPlugin      = require('html-webpack-plugin');
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin');
const CaseSensitivePlugin    = require('case-sensitive-paths-webpack-plugin');
const webpack                = require('webpack');

const config                 = require('./common.config');

const PROXY_DOMAIN = require('./paths').PROXY_DOMAIN;
const PROXY_PORT   = require('./paths').PROXY_PORT;
const PUBLIC_PATH  = require('./paths').PUBLIC_PATH;
const SRC_PATH     = require('./paths').SRC_PATH;
const TMPL_PATH    = require('./paths').TMPL_PATH;
const ENTRY_PATH   = require('./paths').ENTRY_PATH;
const DIST_PATH    = require('./paths').DIST_PATH;

const MODERNIZR_FILENAME = 'modernizr.js';

module.exports = Object.assign(config, {

  entry : {
    common : [
      `webpack-dev-server/client?http://${PROXY_DOMAIN}:${PROXY_PORT}`,
      'webpack/hot/only-dev-server',
      ENTRY_PATH
    ]
  },

  output : {
    path              : DIST_PATH,
    publicPath        : PUBLIC_PATH,
    filename          : '[name].js',
    jsonpFunction     : '__split_loader',
    hotUpdateFunction : '__hot_update_loader'
  },

  devtool : 'source-map',

  module : {
    loaders : [
      // https://github.com/wallacyyy/simple-react-flux-example/blob/master/webpack.config.js
      {
        test    : /\.jsx?$/,
        loaders : ['react-hot', 'babel'],
        include : SRC_PATH
      },
      {
        test    : /\.scss$/,
        loader  : 'style!css?sourceMap!sass?sourceMap!postcss',
        include : SRC_PATH
      }
    ]
  },

  plugins : [
    new CaseSensitivePlugin(),
    new WebpackNotifierPlugin(),
    new HtmlWebpackPlugin({
      template : TMPL_PATH,
      filename : 'index.html',
      modName  : MODERNIZR_FILENAME,
      title    : 'Dev Mode'
    }),
    new ModernizrWebpackPlugin({
      noChunk  : true,
      filename : MODERNIZR_FILENAME,
      options  : [ 'setClasses' ],
      'feature-detects' : [ 'forms/placeholder' ]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/webpack/webpack/issues/292#issuecomment-44804366
    new webpack.DefinePlugin({
      'process.env' : { NODE_ENV: JSON.stringify('development') },
      'VERSION'     : JSON.stringify('pre-release')
    })
  ]

});
