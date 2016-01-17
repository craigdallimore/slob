'use strict';

const gulp       = require('gulp');
const util       = require('gulp-util');
const browserify = require('browserify');
const watchify   = require('watchify');
const babelify   = require('babelify');
const factor     = require('factor-bundle');
const source     = require('vinyl-source-stream');
const cssmodules = require('css-modulesify');

// handleError :: Error -> undefined
const handleError = err => {

  util.log(util.colors.red(
    `Error: ${err.message}`
  ));

};

const factorEntries = [
  './src/entry.js',
  './src/routes/a/component/index.js',
  './src/routes/b/component/index.js'
];

const factorOutputs = [
  './dist/core.js',
  './dist/a.js',
  './dist/b.js'
];

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md

const rebundle = b => {

  b.on('log', util.log)
    .on('error', handleError)
    .transform(babelify)
    .plugin(factor, { o : factorOutputs })
    .plugin(cssmodules, {
      rootDir : __dirname,
      output : './dist/bundle.css'
    })
    .bundle()
    .pipe(source('common.js'))
    .pipe(gulp.dest('./dist'));

};

// bundle :: Boolean watch -> undefined
const bundle = watch => {

  let b = browserify({
    entries      : factorEntries,
    cache        : {},
    packageCache : {},
    fullPaths    : false,
    debug        : true
  });

  if (watch) {

    b = watchify(b);

    b.on('update', () => {
      util.log('UPDATE');
      return rebundle(b);
    });

  }

  return rebundle(b);

};

gulp.task('js', () => {

  bundle(false); // Build JS once

});

gulp.task('watch', () => {

  bundle(true); // Watch and build JS

});

gulp.task('default', ['js', 'watch']);
