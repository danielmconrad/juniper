repos = require '../tasks/repos'
nginx = require '../tasks/nginx'
{logger} = require '../utils'
{series} = require 'async'

module.exports = ->
  series [
    (cb) ->
      logger.info 'Stopping project repos...'
      repos.stop (err) ->
        return logger.error err if err
        logger.success 'Project repos stopped.'
        cb()
    (cb) ->
      logger.info 'Stopping project nginx...'
      nginx.stop (err) ->
        return logger.error err if err
        logger.success 'Project nginx stopped.'
        cb()
  ]
