- [] Proper watchifying
- [] Minification
- [] CSS Modules
- [] i18n Translations
- [] Route loading (not just module loading)
- [] Widget example
- want to go to a route and get
  - a point where we can check auth
  - a temporary loading view!
  - check the _data_ is available, and either show the loaded view or an empty state

### x.js

`x.js` is a super basic script loader.
We'd want to consider things like:
- not loading the same script twice
- how to identify scripts (what names they get?)
- what do do if a load fails... (retry?)
- how to _know_ that a load failed, and call a callback.
- cheeck assumptions work on all modern browsers
- how to expose the global list of scripts
- how well browserified factor-bundles work when loaded in this way!
- how to do subsequent transforms on browserified factor-bundles.

```
var scriptName = 'x.js';

console.log('[1] ' + scriptName + ' loaded');

//-- Establish global thing ---------------------------------------------------

window.asyncScripts = {};

//-- Script loading -----------------------------------------------------------

var head   = document.getElementsByTagName('head')[0];
var script = document.createElement('script');

script.type    = 'text/javascript';
script.charset = 'utf-8';
script.src     = 'y.js';
script.onload = function() {
  console.log('[3] y.js onload fired');
  window.asyncScripts['y.js'].onLoad(scriptName, function(str) {
    console.log('[5] passed to ' + scriptName + ': ' + str);
  });
};

head.appendChild(script);
```

## y.js

`y.js` is a script that could be loaded asynchronously.

(function(global) {

  var scriptName = 'y.js';

  console.log('[2] ' + scriptName + ' loaded async');

  global.asyncScripts[scriptName] = {

    onLoad : function(str, cb) {

      console.log('[4] passed to ' + scriptName + ': ' + str);
      cb(scriptName);

    }

  };

}(window));

```
