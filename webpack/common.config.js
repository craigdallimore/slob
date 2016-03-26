'use strict';

const path         = require('path');
const autoprefixer = require('autoprefixer');
const CONTEXT_PATH = path.join(__dirname, '..');
const DIST_PATH    = path.join(__dirname, '../dist');
const SRC_PATH     = path.join(__dirname, '../src');

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

  }

};
