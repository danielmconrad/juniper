colors = require 'colors'

colors.setTheme
  debug: 'blue'
  error: 'red'
  info: 'grey'
  juniper: 'green'
  started: 'yellow'
  success: 'green'
  warning: 'magenta'

module.exports =
  debug: ->
    console.log "[juniper-debug]    ".debug, arguments...

  error: ->
    console.log "[juniper-error]    ".error, arguments...

  info: ->
    console.log "[juniper-info]     ".info, arguments...

  started: ->
    console.log "[juniper-started]  ".started, arguments...

  success: ->
    console.log "[juniper-success]  ".success, arguments...

  warning: ->
    console.log "[juniper-warning]  ".warning, arguments...

  checkForError: (done) ->
    (err) =>
      return @error err if err
      done()