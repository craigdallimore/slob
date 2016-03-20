/*eslint-disable no-unused-vars */
'use strict';

const React            = require('react');
const ReactDOM         = require('react-dom');
const { Router }       = require('react-router');
const { IntlProvider } = require('react-intl');
const history          = require('./history');
const language         = require('common/en-GB');

require('./scss/main.scss');

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
  <IntlProvider {...language}>
    <Router
      routes  = { rootRoute }
      history = { history }
    />
  </IntlProvider>,
  document.getElementById('main')
);
