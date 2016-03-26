'use strict';

const ExtractTextPlugin      = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin      = require('html-webpack-plugin');
const ModernizrWebpackPlugin = require('modernizr-webpack-plugin');
const webpack                = require('webpack');

const config            = require('./common.config');
const SRC_PATH          = require('./paths').SRC_PATH;
const TMPL_PATH         = require('./paths').TMPL_PATH;
const DIST_PATH         = require('./paths').DIST_PATH;
const ENTRY_PATH        = require('./paths').ENTRY_PATH;
const BUILD             = require('../package.json').version;

const MODERNIZR_FILENAME = `modernizr-${BUILD}.js`;

module.exports = Object.assign(config, {

  entry  : {
    common : [ ENTRY_PATH ]
  },

  output : {
    path          : DIST_PATH,
    filename      : `[name].${BUILD}.js`,
    jsonpFunction : '__split_loader'
  },

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
        loader  : ExtractTextPlugin.extract('css!postcss!sass'),
        include : SRC_PATH
      }
    ]
  },

  plugins : [
    new HtmlWebpackPlugin({
      template : TMPL_PATH,
      filename : 'index.html',
      modName  : MODERNIZR_FILENAME,
      title    : 'Prod Mode'
    }),
    new ModernizrWebpackPlugin({
      noChunk  : true,
      filename : MODERNIZR_FILENAME,
      options  : [ 'setClasses' ],
      'feature-detects' : [ 'forms/placeholder' ]
    }),
    new ExtractTextPlugin(`bundle.${BUILD}.css`, { allChunks : true }),
    // https://github.com/webpack/webpack/issues/292#issuecomment-44804366
    new webpack.DefinePlugin({
      'process.env' : { NODE_ENV: JSON.stringify('production') },
      'VERSION'     : JSON.stringify(BUILD)
    })
  ]

});
