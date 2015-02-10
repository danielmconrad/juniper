{partial} = require 'underscore'
{series} = require 'async'
{exec} = require 'child_process'
{remove} = require 'fs-extra'
{config, logger, doneErrHandler} = require '../utils'

module.exports =
  install: (done) ->
    logger.started 'Installing all project repos...'
    asyncActions = []
    asyncActions.push module.exports.remove

    for name of config.project.sites
      asyncActions.push partial(module.exports.installOne, name)

    series asyncActions, doneErrHandler(done)

  installOne: (name, done) ->
    logger.started "Installing site repo for #{name}..."
    site = config.project.sites[name]
    exec "git clone #{site.repo} repos/#{name}", doneErrHandler(done)

    return done() unless site.install

    process.chdir site.files.root

    exec site.install, (err) ->
      return logger.error err if err
      process.chdir config.dir
      done()

  start: (done) ->
    logger.started 'Starting all project repos...'
    asyncActions = []

    for name of config.project.sites
      asyncActions.push partial(module.exports.startOne, name)

    series asyncActions, doneErrHandler(done)

  startOne: (name, done) ->
    logger.started "Starting site repo for #{name}"
    site = config.project.getFormattedSite name
    return done() unless site.start

    process.chdir site.files.root

    exec site.start, (err) ->
      return logger.error err if err
      process.chdir config.dir
      done()

  stop: (done) ->
    logger.started 'Stopping all project repos...'
    asyncActions = []

    for name of config.project.sites
      asyncActions.push partial(module.exports.stopOne, name)

    series asyncActions, doneErrHandler(done)

  stopOne: (name, done) ->
    logger.started "Stopping site repo for #{name}"
    site = config.project.getFormattedSite name
    return done() unless site.stop

    process.chdir site.files.root

    exec site.stop, (err) ->
      # return logger.error err if err
      process.chdir config.dir
      done()

  remove: (done) ->
    remove 'repos', doneErrHandler(done)

  removeOne: (name, done) ->
    remove "repos/#{name}", doneErrHandler(done)

  update: (done) ->
    logger.started 'Updating all project repos...'

    asyncActions = []

    for name of config.project.sites
      asyncActions.push partial(module.exports.updateOne, name)

    series asyncActions, doneErrHandler(done)

  updateOne: (name, done) ->
    logger.started "Updating site repo for #{name}"
    site = config.project.getFormattedSite name

    process.chdir site.files.root
    exec "git checkout #{site.branch} && git pull", (err) ->
      return logger.error err if err
      process.chdir config.dir
      logger.success 'Done!'
      done()
