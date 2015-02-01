fs = require 'fs'
{ask, logger} = require '../util'
init = require './init'

module.exports = (actionArgs) ->
  return logger.error 'Please provide a project name.' unless actionArgs.length

  [projectName] = actionArgs
  folder = process.cwd()
  newFolder = "#{folder}/#{projectName}"

  onAnswer = ->
    makeFolder newFolder, ->
      init [newFolder, '-f']

  if fs.existsSync(newFolder)
    askToContinue(onAnswer)
  else
    onAnswer()

askToContinue = (onAnswer) ->
  warning = 'Project folder already exists.'
  question = 'Would you like to overwrite the folder?'

  ask.yesOrNo {warning, question}, (yep) ->
    return logger.warning 'Exiting.' unless yep
    onAnswer()

makeFolder = (newFolder, cb) ->
  fs.mkdir newFolder, (err) ->
    return logger.error 'Could not create folder.' if err
    logger.success 'Project folder created.'
    cb()