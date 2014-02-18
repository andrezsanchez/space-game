'use strict';

var gulp = require('gulp')

var paths = {
  jshint: ['*.json', '*.js'],
  stylus: 'stylus/*.styl',
  css: 'public/css',
  js: 'public/js',
  client: {
    entry: 'client/index.js',
    js: 'client/**/*.js'
  }
}

var jshint      = require('./gulp/jshint')
var stylus      = require('./gulp/stylus')
var clean       = require('./gulp/clean')
var browserify  = require('./gulp/browserify')

gulp.task('clean-css', clean(paths.css))
gulp.task('jshint', jshint(paths.jshint))
gulp.task('stylus', ['clean-css'], stylus(paths.stylus, paths.css, 'style.css'))
gulp.task('browserify', browserify(paths.client.entry, paths.js, 'index.js'))

gulp.task('watch', function() {
  gulp.watch(paths.jshint, ['jshint'])
  gulp.watch(paths.stylus, ['stylus'])
  gulp.watch(paths.client.js, ['browserify'])
})

gulp.task('default', ['jshint', 'stylus', 'browserify', 'watch'])