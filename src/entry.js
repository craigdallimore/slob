/*eslint-disable no-unused-vars */
'use strict';

const React                = require('react');
const ReactDOM             = require('react-dom');
const { Router }           = require('react-router');
const { IntlProvider }     = require('react-intl');
const history              = require('./history');
const { locale, messages } = require('common/en-GB');

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
  <IntlProvider
    locale   = { locale }
    messages = { messages }
  >
    <Router
      routes  = { rootRoute }
      history = { history }
    />
  </IntlProvider>,
  document.getElementById('main')
);
