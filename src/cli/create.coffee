fs = require 'fs'
{ask, logger} = require '../utils'
init = require './init'

module.exports = (actionArgs, done) ->
  return logger.error 'Please provide a project name.' unless actionArgs.length

  [projectName] = actionArgs
  newFolder = "#{process.cwd()}/#{projectName}"

  next = ->
    process.chdir newFolder
    init done

  if fs.existsSync(newFolder)
    next()
  else
    fs.mkdir newFolder, (err) ->
      return logger.error 'Could not create folder.' if err
      logger.success 'Project folder created.'
      next()


