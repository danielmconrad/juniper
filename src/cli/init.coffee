fs = require 'fs'
{ask, has, logger} = require '../utils'
configTemplate = require '../templates/config.cson.js'

module.exports = (actionArgs) ->
  forceOverwrite = has actionArgs, ['-f', '--force']
  folder = process.cwd()
  file = "#{folder}/config.cson"
  content = configTemplate()

  onAnswer = ->
    writeFile(file, content)

  if fs.existsSync(file) and not forceOverwrite
    askToContinue(onAnswer)
  else
    onAnswer()

askToContinue = (onAnswer) ->
  warning = 'Configuration file already exists.'
  question = 'Would you like to overwrite the file?'

  ask.yesOrNo {warning, question}, (yep) ->
    return logger.warning 'Exiting.' unless yep
    onAnswer()

writeFile = (file, content) ->
  fs.writeFile file, content, (err) ->
    return logger.error err if err
    logger.success 'Configuration created. \nNext up, modify your `config.cson` file to reflect your desired server configuration.'
