'use strict';

module.exports = {

  path: 'b',

  getComponent(location, cb) {
    //require.ensure([], (require) => {
    cb(null, require('./component/'));
    //})
  }

};
