'use strict';

var gulp     = require('gulp')
var rimraf   = require('gulp-rimraf')

function makeTask(files) {
  return function() {
    var stream = gulp.src(files, {read: false})
      .pipe(rimraf({force: true}))
    return stream
  }
}

module.exports = makeTask

