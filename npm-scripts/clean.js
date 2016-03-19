'use strict';

const del  = require('delete');
const path = require('path');

console.warn('Cleaning /dist');

del([
  path.join(__dirname, '../dist/*.html'),
  path.join(__dirname, '../dist/*.js'),
  path.join(__dirname, '../dist/*.css'),
  path.join(__dirname, '../dist/*.map')
], err => {
  if (err) { throw err; }
  console.info('/dist cleaned');
});
