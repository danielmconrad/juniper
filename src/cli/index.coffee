{logger} = require '../utils'
pack = require '../../package.json'

[node, juniper, action, actionArgs...] = process.argv

actionArgs = undefined unless actionArgs.length

if action in ['create', 'init', 'install', 'start', 'stop', 'restart', 'remove', 'update']
  cliAction = require("./#{action}")
  cliAction actionArgs, null

else

  switch action
    when '-v' then console.log "v#{pack.version}"
    when '-h' then console.log """

    Usage: juniper [action [options]]

    Actions:

      create <project>    Create a new folder and init it as a juniper project
      init                Initalize project
      install <siteName>  Install the dependencies of this project or site
      start <siteName>    Start project or site
      stop <siteName>     Stop project or site
      restart <siteName>  Restart project or site
      remove <siteName>   Remove all settings, stop all services for this project or site
      update <siteName>   Stop, update, and restart project or site

  """