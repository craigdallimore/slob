'use strict';

const loader = require('../../../loader');

module.exports = {

  path: 'a',

  getComponent(location, cb) {

    console.log('[0] getComponent called (a)');
    loader.load('./a.js', (c) => {

      console.log('should be component', c);

      cb(null, c);

    });
  }

};
