{logger} = require '../utils'

[node, juniper, action, actionArgs...] = process.argv

try
  actionArgs = undefined unless actionArgs.length
  cliAction = require("./#{action}")
  cliAction actionArgs, null
catch e
  logger.error "Couldn\'t find action `#{action}`"
  console.log e
