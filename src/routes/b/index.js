'use strict';

module.exports = {

  path: 'b',

  getComponent(location, cb) {

    require.ensure([], (require) => {

      const component = require('./component');

      cb(null, component);

    });

  }

};
