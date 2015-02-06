{nginx, repos} = require '../tasks'
{ask, logger} = require '../utils'
{applyEach, series} = require 'async'
{remove} = require 'fs-extra'
{exec} = require 'child_process'

module.exports = (siteName, done) ->

  if siteName?
    applyEach [
      repos.stopOne
      nginx.stopOne
      nginx.removeOne
      repos.removeOne
    ], siteName, -> done?()

  else
    warning = 'This will stop all services and delete the project.'
    question = 'Are you sure you want to delete the project?'

    removeProject = (cb) ->
      logger.info 'Removing project'
      remove process.cwd(), cb

    ask.yesOrNo {warning, question}, (yep) ->
      return logger.warning 'Exiting.' unless yep

      series [repos.stop, nginx.stop, removeProject], -> done?()
