'use strict';

module.exports = {

  path: 'a',

  getComponent(location, cb) {
    //require.ensure([], (require) => {
    cb(null, require('./component/'));
    //})
  }

};
