'use strict';

const autoprefixer = require('autoprefixer');
const CONTEXT_PATH = require('./paths').CONTEXT_PATH;

module.exports = {

  context : CONTEXT_PATH,

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
