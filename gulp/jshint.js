'use strict';

var gulp = require('gulp')
var jshint = require('gulp-jshint')
var stylish = require('jshint-stylish')

function makeTask(files, jshintrc) {
  return function() {
    gulp.src(files)
      .pipe(jshint(jshintrc))
      .pipe(jshint.reporter(stylish))
  }
}

module.exports = makeTask
