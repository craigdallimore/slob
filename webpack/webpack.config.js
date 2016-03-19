'use strict';

const path                  = require('path');
// const ExtractTextPlugin     = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

const CONTEXT_PATH = path.join(__dirname, '..');
const DIST_PATH    = './dist';
// const DEBUG        = process.env.NODE_ENV === 'development';

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
        loader  : 'style!css!sass?sourceMap',
        include : path.join(__dirname, '../src/scss/')
      },
      //{
        //test : /\.css$/,
        //loader : 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        //loader : ExtractTextPlugin.extract(
          //'style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        //)
      //},
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
    new WebpackNotifierPlugin()
    //new ExtractTextPlugin('bundle.css', { allChunks : true })
  ]

};
