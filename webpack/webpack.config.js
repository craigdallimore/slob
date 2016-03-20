'use strict';

const path                  = require('path');
const ExtractTextPlugin     = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const autoprefixer          = require('autoprefixer');

const CONTEXT_PATH = path.join(__dirname, '..');
const DIST_PATH    = path.join(__dirname, '../dist');
const SCSS_PATH    = path.join(__dirname, '../src/scss/');
const SRC_PATH     = path.join(__dirname, '../src');
const TMPL_PATH    = path.join(__dirname, '../src/template/index.ejs');

const DEBUG = process.env.NODE_ENV === 'development';

const scssLoader = DEBUG ?  'style!css!sass?sourceMap!postcss' : ExtractTextPlugin.extract('css!postcss!sass');

module.exports = {

  context : CONTEXT_PATH,

  entry  : {
    common : [ './src/entry' ]
  },

  output : {
    path              : DIST_PATH,
    filename          : '[name].js',
    jsonpFunction     : '__split_loader',
    hotUpdateFunction : '__hot_update_loader'
  },

  devtool : 'source-map',

  module : {

    loaders : [
      // https://github.com/wallacyyy/simple-react-flux-example/blob/master/webpack.config.js
      {
        test    : /\.scss$/,
        loader  : scssLoader,
        include : SCSS_PATH
      },
      {
        test    : /\.jsx?$/,
        loaders : ['react-hot', 'babel'],
        include : SRC_PATH
      }
    ]

  },

  postcss () {

    return [ autoprefixer ];

  },

  resolve : {

    modulesDirectories : [
      'node_modules'
    ],
    extensions : [
      '',
      '.scss',
      '.js',
      '.jsx',
      '.json'
    ]

  },

  plugins : [
    new WebpackNotifierPlugin(),
    new HtmlWebpackPlugin({
      template : TMPL_PATH,
      filename : 'index.html',
      title    : DEBUG ? 'Dev Mode' : 'Production'
    }),
    new ExtractTextPlugin('bundle.css', { allChunks : true })
  ]

};
