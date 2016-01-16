'use strict';

module.exports = {

  path: 'b',

  getComponent(location, cb) {

    loadjs([

      `.${__dirname}/component/index`

    ], component => {

      cb(null, component);

    });

  }

};
