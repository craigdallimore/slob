
'use strict';

const React  = require('react');
const styles = require('../styles.css');

console.log(styles, 'foo');

const A = React.createClass({

  render() {

    return <h2 className = { styles.heading }>A</h2>;

  }

});

module.exports = A;
