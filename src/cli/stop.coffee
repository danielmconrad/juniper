{nginx, repos} = require '../tasks'
{applyEach, series} = require 'async'

module.exports = (siteName, done) ->
  if siteName?
    applyEach [repos.stopOne, nginx.stopOne], siteName, -> done?()
  else
    series [repos.stop, nginx.stop], -> done?()
