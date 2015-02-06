start = require './start'
stop = require './stop'
{repos} = require '../tasks'
{applyEach, series} = require 'async'

module.exports = (siteName, done) ->
  if siteName?
    applyEach [stop, repos.updateOne, start], siteName, -> done?()
  else
    series [stop, repos.update, start], -> done?()
