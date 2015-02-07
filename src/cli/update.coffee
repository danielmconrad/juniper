start = require './start'
stop = require './stop'
{repos} = require '../tasks'
{applyEach, series} = require 'async'
{partial} = require 'underscore'

module.exports = (siteName, done) ->
  if siteName?
    applyEach [
      stop
      repos.updateOne
      start
    ], siteName, -> done?()
  else
    series [
      partial(stop, null)
      repos.update
      partial(start, null)
    ], -> done?()
