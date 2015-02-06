start = require './start'
stop = require './stop'
{applyEach} = require 'async'

module.exports = (siteName, done) ->
  applyEach [stop, start], siteName, -> done?()
