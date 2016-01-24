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
    // Lets understand browserify.
    // Browserify starts at the entry point files you give it and searches for
    // calls to require(), looks at the strings in them and follows the file
    // paths, and continues looking in those files for further require calls.
    //
    // Browserify acts in phases http://jmm.github.io/browserify-pipeline-docs/
    //
    // Browserify exposes it's "compiler pipeline" as a "label-stream-splicer".
    // Transformatons can be added to / removed from the internal pipeline.
    //
    //
    //
    //
    // Factor bundle.
    // factor "browser-pack" bundles into a common bundle and entry specific bundles.
    // Browserify plugins export a function (b, opts) => ?
    // Browserify plugins operate on the bundle instance b by listening for
    // events or splicing transforms into the pipeline.
    //
    .plugin(factor, { o : factorOutputs })
    .plugin(cssmodules, {
      rootDir : __dirname,
      output : './dist/bundle.css'
    })

    .bundle() // Bundle bundles the files and deps into a single javascript
              // file, and returns a _readable_ stream.

    // vinyl source stream converts browserify to the kind of stream gulp
    // expects.
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
