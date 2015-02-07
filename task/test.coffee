gulp = require 'gulp'
coffee = require 'gulp-coffee'
jasmine = require 'gulp-jasmine'
gutil = require 'gulp-util'

gulp.task 'test', ['test:build'], ->
  gulp.src('spec/lib/**/*.spec.js').pipe jasmine(verbose:true)

gulp.task 'test:build', ->
  source = gulp.src 'spec/src/**/*.coffee'
  stream = coffee({bare: true}).on 'error', gutil.log
  output = gulp.dest 'spec/lib'
  source.pipe(stream).pipe(output)

gulp.task 'test:watch', ['test'], ->
  gulp.watch ['spec/src/**/*.coffee'], ['test']
