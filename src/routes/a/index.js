'use strict';

module.exports = {

  path: 'a',

  getComponent(location, cb) {

    loadjs([

      `.${__dirname}/component/index`

    ], component => {

      cb(null, component);

    });
  }

};
