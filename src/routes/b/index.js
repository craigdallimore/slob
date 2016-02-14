'use strict';

module.exports = {

  path: 'b',

  getComponent(location, cb) {

    console.log('getComponent b');
    require.ensure([], (require) => {

      const component = require('./component')
      console.log(component);

      cb(null, component);

    });

  }

};
