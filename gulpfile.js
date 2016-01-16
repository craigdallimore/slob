'use strict';

const gulp       = require('gulp');
const util       = require('gulp-util');
const browserify = require('browserify');
const watchify   = require('watchify');
const babelify   = require('babelify');
const partition  = require('partition-bundle');

const partitionMap = {
  'common.js' : ['./src/entry'],
  'a.js'      : ['./src/routes/a/component/index'],
  'b.js'      : ['./src/routes/b/component/index']
};

// handleError :: Error -> undefined
const handleError = err => {

  util.log(util.colors.red(
    `Error: ${err.message}`
  ));

};

// https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
const opts = {
  cache        : {},
  packageCache : {},
  fullPaths    : false,
  debug        : true
};

// rebundle :: Object browserify -> ???
const rebundle = b => {

  return b
    .bundle()
    .on('error', handleError);

};

// bundle :: Boolean watch -> undefined
const bundle = watch => {

  let b = browserify(opts);

  b.on('log', util.log);

  b.transform(babelify);
  b.plugin(partition, {
    map : partitionMap ,
    output : './dist'
  });

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
