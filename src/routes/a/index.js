'use strict';

module.exports = {

  path: 'a',

  getComponent(location, cb) {

    console.log('getComponent a');
    require.ensure([], (require) => {

      const component = require('./component')
      console.log(component);

      cb(null, component);

    });

  }

};
