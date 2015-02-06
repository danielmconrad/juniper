{nginx, repos} = require '../tasks'
{applyEach, series} = require 'async'

module.exports = (siteName, done) ->
  if siteName?
    applyEach [nginx.installOne, repos.installOne], siteName, -> done?()
  else
    series [nginx.install, repos.install], -> done?()
