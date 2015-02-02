repos = require '../tasks/repos'
nginx = require '../tasks/nginx'
{ask, logger} = require '../utils'
{series} = require 'async'
{exec} = require 'child_process'
{config, logger} = require '../utils'

module.exports = ->

  warning = 'This will stop all services and delete the project.'
  question = 'Are you sure you want to delete the project?'

  ask.yesOrNo {warning, question}, (yep) ->
    return logger.warning 'Exiting.' unless yep

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
      (cb) ->
        logger.info 'Removing project repos...'
        repos.remove (err) ->
          return logger.error err if err
          logger.success 'Project repos removed.'
          cb()
      # (cb) ->
      #   logger.info 'Removing project nginx...'
      #   nginx.remove (err) ->
      #     return logger.error err if err
      #     logger.success 'Project nginx removed.'
      #     cb()
      (cb) ->
        logger.info 'Removing project'
        exec "rm -rf #{config.dir}", -> cb()
    ]
