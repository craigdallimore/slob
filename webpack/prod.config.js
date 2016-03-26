'use strict';

const SRC_PATH  = require('./paths').SRC_PATH;
const TMPL_PATH = require('./paths').TMPL_PATH;

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config            = require('./common.config');

config.module.loaders.push({

  test    : /\.scss$/,
  loader  : ExtractTextPlugin.extract('css!postcss!sass'),
  include : SRC_PATH

});

config.plugins = [
  new HtmlWebpackPlugin({
    template : TMPL_PATH,
    filename : 'index.html',
    title    : 'Prod Mode'
  }),
  new ExtractTextPlugin('bundle.css', { allChunks : true })
];

module.exports = config;

