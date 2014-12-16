readline = require 'readline'
logger = require './logger'

module.exports =
  yesOrNo: ({warning, question}, cb) ->
    logger.warning warning

    rl = readline.createInterface
      input: process.stdin
      output: process.stdout

    rl.question "#{question} (Y/n) ", (answer) ->
      rl.close()
      cb answer.toLowerCase() is 'y'
