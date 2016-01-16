'use strict';

const gulp       = require('gulp');
const util       = require('gulp-util');
const browserify = require('browserify');
const watchify   = require('watchify');
const babelify   = require('babelify');
const source     = require('vinyl-source-stream');

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

const common = 'common.js';

// handleError :: Error -> undefined
const handleError = err => {

  util.log(util.colors.red(
    `Error: ${err.message}`
  ));

};

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
const opts = {
  entries      : factorEntries,
  cache        : {},
  packageCache : {},
  fullPaths    : false,
  debug        : false
};

const factor = require('factor-bundle');

// rebundle :: Object browserify -> ???
const rebundle = b => {

  return b
    .plugin(factor, { o : factorOutputs })
    .bundle()
    .on('error', handleError)
    .pipe(source(common))
    .pipe(gulp.dest('./dist'));

};

// bundle :: Boolean watch -> undefined
const bundle = watch => {

  let b = browserify(opts);

  b.on('log', util.log);

  b.transform(babelify);

  if (watch) {

    b = watchify(b);

    b.on('update', () => {
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
