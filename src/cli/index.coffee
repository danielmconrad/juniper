{logger} = require '../utils'

[node, juniper, action, actionArgs...] = process.argv

try
  require("./#{action}")(actionArgs)
catch e
  logger.error "Couldn\'t find action `#{action}`"
  console.log e
