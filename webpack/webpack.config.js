'use strict';

const path                  = require('path');
const ExtractTextPlugin     = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin     = require('html-webpack-plugin');

const CONTEXT_PATH = path.join(__dirname, '..');
const DIST_PATH    = '../dist';
const DEBUG        = process.env.NODE_ENV === 'development';

const scssLoader = DEBUG ?  'style!css!sass?sourceMap' : ExtractTextPlugin.extract('css!sass');

module.exports = {

  context : CONTEXT_PATH,

  entry  : {
    common : [ './src/entry' ]
  },

  output : {
    path     : path.join(__dirname, DIST_PATH),
    filename : '[name].js'
  },

  devtool : 'source-map',

  module : {

    loaders : [
      // https://github.com/wallacyyy/simple-react-flux-example/blob/master/webpack.config.js
      {
        test    : /\.scss$/,
        loader  : scssLoader,
        include : path.join(__dirname, '../src/scss/')
      },
      {
        test    : /\.jsx?$/,
        loaders : ['react-hot', 'babel'],
        include : path.join(__dirname, '../src')
      }
    ]

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
      template : path.join(__dirname, '../src/template/index.ejs'),
      filename : 'index.html',
      title    : DEBUG ? 'Dev Mode' : 'Production'
    }),
    new ExtractTextPlugin('bundle.css', { allChunks : true })
  ]

};
