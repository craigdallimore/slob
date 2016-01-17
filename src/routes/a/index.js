'use strict';

const loadjs = require('fg-loadjs');

module.exports = {

  path: 'a',

  getComponent(location, cb) {

    loadjs(['a.js'], event => {

      console.log('should be component', event);

      cb(null, event);

    });
  }

};
