'use strict';

const React          = require('react');
const { injectIntl } = require('react-intl');

const A = React.createClass({

  render() {

    return <h2>{ this.props.intl.formatMessage({ id : 'label-a' }) }</h2>;

  }

});

module.exports = injectIntl(A);
