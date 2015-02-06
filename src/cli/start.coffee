{nginx, repos} = require '../tasks'
{applyEach, series} = require 'async'

module.exports = (siteName, done) ->
  if siteName?
    applyEach [repos.startOne, nginx.startOne], siteName, -> done?()
  else
    series [repos.start, nginx.start], -> done?()
