gulp = require 'gulp'
gutil = require 'gulp-util'
coffee = require 'gulp-coffee'
clean = require 'gulp-clean'
handlebars = require 'gulp-handlebars'
defineModule = require 'gulp-define-module'
wrap = require 'gulp-wrap'
{exec} = require 'child_process'

# Main
gulp.task 'dev', ['build', 'link', 'watch'], ->

gulp.task 'build', ['build:clean', 'build:coffee', 'build:hbs', 'build:copy'], ->

gulp.task 'build:clean', (cb) ->
  exec 'rm -rf lib', (err, stdout, stderr) ->
    console.log 'stderr: ', stderr if stderr
    cb err

gulp.task 'build:coffee', ['build:clean'], ->
  source = gulp.src 'src/**/*.coffee'
  stream = coffee({bare: true}).on 'error', gutil.log
  output = gulp.dest 'lib'
  source.pipe(stream).pipe(output)

gulp.task 'build:hbs', ['build:clean'], ->
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

gulp.task 'watch', ->
  watcher = gulp.watch 'src/**/*.coffee', ['build', 'link']

  watcher.on 'change', ({path, type}) ->
    console.log "File #{path} was #{type}, running tasks..."

gulp.task 'link', (cb) ->
  exec 'npm link', (err, stdout, stderr) ->
    console.log 'stderr: ', stderr if stderr
    cb err
