gulp = require 'gulp'
gutil = require 'gulp-util'
coffee = require 'gulp-coffee'
handlebars = require 'gulp-handlebars'
defineModule = require 'gulp-define-module'
{remove} = require 'fs-extra'
sequence = require 'run-sequence'

# Main
gulp.task 'build', (cb) ->
  sequence 'build:clean', ['build:coffee', 'build:hbs', 'build:copy'], cb

gulp.task 'build:clean', (cb) ->
  remove 'lib', (err) ->
    console.log err if err
    cb err

gulp.task 'build:coffee', ->
  source = gulp.src 'src/**/*.coffee'
  stream = coffee({bare: true}).on 'error', gutil.log
  output = gulp.dest 'lib'
  source.pipe(stream).pipe(output)

gulp.task 'build:hbs', ->
  source = gulp.src 'src/**/*.hbs'
  stream = handlebars()
  wrapper = defineModule 'node'
  output = gulp.dest 'lib'
  source.pipe(stream).pipe(wrapper).pipe(output)

gulp.task 'build:copy', ->
  sources = [
    'src/**/*.json'
    'src/**/*.js'
  ]
  source = gulp.src sources
  output = gulp.dest 'lib'
  source.pipe(output)
