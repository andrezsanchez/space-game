'use strict';

var gulp       = require('gulp')
var browserify = require('gulp-browserify')
var rename     = require('gulp-rename')

function makeTask(source, output, name) {
  return function() {
    var stream = gulp.src(source)
      .pipe(browserify({debug: true}))
      .pipe(rename(name))
      .pipe(gulp.dest(output))
    return stream
  }
}

module.exports = makeTask

