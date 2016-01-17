/*eslint-disable no-unused-vars */
'use strict';

const React      = require('react');
const ReactDOM   = require('react-dom');
const { Router } = require('react-router');
const { useQueries, createHashHistory } = require('history');

const rootRoute = {
  component : 'div',
  childRoutes : [
    {
      path : '/',
      component : require('./component/'),
      childRoutes : [
        require('./routes/a/'),
        require('./routes/b/')
      ]
    }
  ]
};

ReactDOM.render(
  <Router
    routes  = { rootRoute }
    history = { useQueries(createHashHistory)() }
  />,
  document.getElementById('main')
);
