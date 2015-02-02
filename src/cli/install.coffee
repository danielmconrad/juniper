repos = require '../tasks/repos'
nginx = require '../tasks/nginx'
{logger} = require '../utils'
{series} = require 'async'

module.exports = ->
  series [
    (cb) ->
      logger.info 'Installing project nginx...'
      nginx.install (err) ->
        return logger.error err if err
        logger.success 'Project nginx installed.'
        cb()
    (cb) ->
      logger.info 'Installing project repos...'
      repos.install (err) ->
        return logger.error err if err
        logger.success 'Project repos installed.'
        cb()
  ]
