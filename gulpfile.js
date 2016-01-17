'use strict';

const gulp       = require('gulp');
const util       = require('gulp-util');
const browserify = require('browserify');
const watchify   = require('watchify');
const babelify   = require('babelify');
const partition  = require('partition-bundle');
const cssmodules = require('css-modulesify');

// handleError :: Error -> undefined
const handleError = err => {

  util.log(util.colors.red(
    `Error: ${err.message}`
  ));

};

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
const opts = {
  entries : ['./src/entry'],
  cache        : {},
  packageCache : {},
  fullPaths    : false,
  debug        : true
};

// bundle :: Boolean watch -> undefined
const bundle = watch => {

  let b = browserify(opts);

  b.on('log', util.log);
  b.on('error', handleError);

  b.transform(babelify);

  b.plugin(partition, {
    map : {
      'common.js' : ['./src/entry'],
      'a.js'      : ['./src/routes/a/component/index'],
      'b.js'      : ['./src/routes/b/component/index']
    },
    main   : './src/entry',
    output : './dist'
  });

  b.plugin(cssmodules, {
    rootDir : __dirname,
    output : './dist/bundle.css'
  });

  if (watch) {

    b = watchify(b);

    b.on('update', () => {
      util.log('UPDATE');
      return b.bundle();
    });

  }

  return b.bundle();

};

gulp.task('js', () => {

  bundle(false); // Build JS once

});

gulp.task('watch', () => {

  bundle(true); // Watch and build JS

});

gulp.task('default', ['js', 'watch']);
