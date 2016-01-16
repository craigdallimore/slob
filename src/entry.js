'use strict';

const one = 1;
const React = require('react');
const ReactDOM = require('react-dom');

console.log(one);

ReactDOM.render(
  <h1>{ one }</h1>,
  document.getElementById('main')
);
