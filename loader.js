'use strict';

global.__asyncScripts = global.__asyncScripts || {};

module.exports = {

  load : function(url, cb) {

    console.log('[1] loader.load called ', url);

    var head   = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');

    script.type    = 'text/javascript';
    script.charset = 'utf-8';
    script.src     = url;

    // TODO make work in IE
    script.onload = function() {

      console.log('[3] element onload fired');

      global.__asyncScripts[url].onLoad(function(v) {
        console.log('[4] onLoad pre-callback', v);
        cb(v);
      });

    };

    head.appendChild(script);

  }

};
