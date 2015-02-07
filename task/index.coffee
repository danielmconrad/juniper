gulp = require 'gulp'
build = require './build'
test = require './test'
{exec} = require 'child_process'
sequence = require 'run-sequence'

gulp.task 'default', (cb) -> sequence 'build', 'test', cb

gulp.task 'all', (cb) -> sequence 'setup', 'build', 'test', cb

gulp.task 'dev', (cb) -> sequence 'build', 'link', cb

gulp.task 'dev:watch', ['dev'], ->
  watcher = gulp.watch 'src/**/*.coffee', ['dev']

  watcher.on 'change', ({path, type}) ->
    console.log "File #{path} was #{type}, running tasks..."

gulp.task 'link', (cb) ->
  exec 'npm link', (err, stdout, stderr) ->
    console.log 'stderr: ', stderr if stderr
    cb err

gulp.task 'setup', (cb) ->
  exec 'npm install', (err, stdout, stderr) ->
    console.log 'stderr: ', stderr if stderr
    cb err
