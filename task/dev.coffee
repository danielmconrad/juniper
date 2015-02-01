gulp = require 'gulp'
gutil = require 'gulp-util'
coffee = require 'gulp-coffee'
handlebars = require 'gulp-handlebars'
wrap = require 'gulp-wrap'
{exec} = require 'child_process'

# Main
gulp.task 'dev', ['build', 'link', 'watch'], ->

gulp.task 'build', ['build:coffee', 'build:hbs', 'build:copy'], ->

gulp.task 'build:coffee', ->
  source = gulp.src 'src/**/*.coffee'
  stream = coffee({bare: true}).on 'error', gutil.log
  output = gulp.dest 'lib'
  source.pipe(stream).pipe(output)

gulp.task 'build:hbs', ->
  source = gulp.src 'src/**/*.hbs'
  stream = handlebars()
  wrapper = wrap 'module.exports = <%= contents %>'
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
