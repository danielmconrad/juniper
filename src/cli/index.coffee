logger = require '../logger'
create = require './create'
init = require './init'
start = require './start'
restart = require './restart'
upstart = require './upstart'

[node, juniper, action, options...] = process.argv

switch action
  when 'create' then create(options)
  when 'init' then init(options)
  when 'start' then start(options)
  when 'restart' then restart(options)
  when 'upstart' then upstart(options)
  else logger.error "Could\'nt find action `#{action}`"