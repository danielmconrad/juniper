{partial} = require 'underscore'
{series} = require 'async'
{exec} = require 'child_process'
{config, logger} = require '../utils'

module.exports =
  install: (done) ->
    asyncActions = []
    asyncActions.push @remove
    asyncActions.push partial(@installOne, site) for site of config.project.sites
    series asyncActions, logger.checkForError(done)

  installOne: (name, done) ->
    site = config.project.sites[name]
    exec "git clone #{site.repo} repos/#{name}", logger.checkForError(done)

  start: (done) ->
    asyncActions = []
    asyncActions.push partial(@startOne, site) for site of config.project.sites
    series asyncActions, done

  startOne: (name, done) ->
    site = config.project.getFormattedSite name
    return done() unless site.start
    exec "cd #{site.files.root} && #{site.start}", logger.checkForError(done)

  stop: (done) ->
    asyncActions = []
    asyncActions.push partial(@stopOne, site) for site of config.project.sites
    series asyncActions, done

  stopOne: (name, done) ->
    site = config.project.getFormattedSite name
    return done() unless site.stop
    exec "cd #{site.files.root} && #{site.stop}", -> done() #logger.checkForError(done)

  remove: (done) ->
    exec "rm -rf repos", logger.checkForError(done)
