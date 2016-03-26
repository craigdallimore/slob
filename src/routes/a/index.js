'use strict';

module.exports = {

  path: 'a',

  getComponent(location, cb) {

    require.ensure([], (require) => {

      const component = require('./component');

      cb(null, component);

    });

  }

};
