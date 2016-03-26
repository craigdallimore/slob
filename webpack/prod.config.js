'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config            = require('./common.config');
const SRC_PATH          = require('./paths').SRC_PATH;
const TMPL_PATH         = require('./paths').TMPL_PATH;
const DIST_PATH         = require('./paths').DIST_PATH;

module.exports = Object.assign(config, {

  entry  : {
    common : [ './src/entry' ]
  },

  output : {
    path              : DIST_PATH,
    filename          : '[name].js',
    jsonpFunction     : '__split_loader'
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
      title    : 'Prod Mode'
    }),
    new ExtractTextPlugin('bundle.css', { allChunks : true })
  ]

});
