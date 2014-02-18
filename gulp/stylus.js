'use strict';

var gulp     = require('gulp')
var stylus   = require('gulp-stylus')
var prefix   = require('gulp-autoprefixer')
var concat   = require('gulp-concat')

function makeTask(source, output, name) {
  return function() {
    var stream = gulp.src(source)
      .pipe(stylus())
      .pipe(prefix())
      .pipe(concat(name))
      .pipe(gulp.dest(output))
    return stream
  }
}

module.exports = makeTask
