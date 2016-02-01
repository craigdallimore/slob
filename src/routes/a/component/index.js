'use strict';

const common = require('common/commonModule.js');

/* to make the factor easier to understand, removing
 * 3rd party libs for now ...
const React  = require('react');
const styles = require('../styles.css');

const A = React.createClass({

  render() {

    return <h2 className = { styles.heading }>A</h2>;

  }

});
*/
global.__asyncScripts['a.js'] = {
  onLoad : function(cb) {
    console.log('a.js onLoad definition');
    cb('hello from a.js');
  }
};

module.exports = 1000;

