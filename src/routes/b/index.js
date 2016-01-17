'use strict';

const loadjs = require('fg-loadjs');

module.exports = {

  path: 'b',

  getComponent(location, cb) {

    loadjs(['b.js'], component => {

      cb(null, component);

    });

  }

};
