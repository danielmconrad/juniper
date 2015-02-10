{partial} = require 'underscore'
{series} = require 'async'
{exec} = require 'child_process'
{writeFile, writeFileSync} = require 'fs'
{mkdirp, remove} = require 'fs-extra'
{platform} = require 'os'
{config, logger, doneErrHandler} = require '../utils'

linuxConfTemplate = require '../templates/nginx.conf.linux'
macConfTemplate = require '../templates/nginx.conf.mac'
mimeTypesTemplate = require '../templates/mime.types'
filesSiteTemplate = require '../templates/site.files'
processSiteTemplate = require '../templates/site.process'

module.exports =
  install: (done) ->
    logger.started 'Installing all project nginx...'
    asyncActions = []
    asyncActions.push module.exports.remove
    asyncActions.push module.exports.installDir
    asyncActions.push module.exports.installConf

    for name of config.project.sites
      asyncActions.push partial(module.exports.installOne, name)

    series asyncActions, doneErrHandler(done, 'Project nginx installed.')

  installOne: (name, done) ->
    logger.started "Installing site nginx for #{name}"
    site = config.project.getFormattedSite name
    template = if site.type is 'process' then processSiteTemplate else filesSiteTemplate

    writeFile "nginx/sites-available/#{name}", template(site), doneErrHandler(done)

  installDir: (done) ->
    mkdirp 'nginx/sites-available', done

  installConf: (done) ->
    confTemplate = switch platform()
      when 'darwin' then macConfTemplate
      when 'linux' then linuxConfTemplate

    writeFileSync 'nginx/nginx.conf', confTemplate(config)
    writeFileSync 'nginx/mime.types', mimeTypesTemplate(config)
    writeFileSync 'nginx/error.log', ''
    writeFileSync 'nginx/access.log', ''

    done()

  remove: (done) ->
    remove 'nginx', (err) -> done()

  removeOne: (name, done) ->
    remove "nginx/sites-available/#{name}", (err) -> done()

  start: (done) ->
    logger.started 'Starting project nginx...'
    handler = doneErrHandler(done)

    exec "sudo nginx -c #{config.dir}/nginx/nginx.conf", handler

  startOne: (name, done) -> module.exports.start done

  stop: (done) ->
    logger.started 'Stopping project nginx...'

    exec 'sudo nginx -s stop', ->
      logger.success 'Done!'
      done()

  stopOne: (name, done) -> module.exports.stop done
