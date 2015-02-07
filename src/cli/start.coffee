{nginx, repos} = require '../tasks'
{applyEach, series} = require 'async'

module.exports = (siteName, done) ->
  if siteName?
    applyEach [nginx.stopOne, repos.startOne, nginx.startOne], siteName, -> done?()
  else
    series [nginx.stop, repos.start, nginx.start], -> done?()
