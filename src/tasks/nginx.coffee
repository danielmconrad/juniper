{partial} = require 'underscore'
{series} = require 'async'
{exec} = require 'child_process'
{writeFile, writeFileSync} = require 'fs'
os = require 'os'
{config, logger} = require '../utils'

linuxConfTemplate = require '../templates/nginx.conf.linux'
macConfTemplate = require '../templates/nginx.conf.mac'
mimeTypesTemplate = require '../templates/mime.types'
filesSiteTemplate = require '../templates/site.files'
processSiteTemplate = require '../templates/site.process'

module.exports =
  install: (done) ->
    asyncActions = []
    asyncActions.push @remove
    asyncActions.push @installDir
    asyncActions.push @installConf
    asyncActions.push partial(@installOne, site) for site of config.project.sites
    series asyncActions, logger.checkForError(done)

  installOne: (name, done) ->
    site = config.project.getFormattedSite name
    template = if site.process? then processSiteTemplate else filesSiteTemplate
    writeFile "nginx/sites-available/#{name}", template(site), logger.checkForError(done)

  installDir: (done) ->
    exec 'mkdir nginx && mkdir nginx/sites-available', done

  installConf: (done) ->
    confTemplate = switch os.platform()
      when 'darwin' then macConfTemplate
      when 'linux' then linuxConfTemplate

    writeFileSync 'nginx/nginx.conf', confTemplate(config)
    writeFileSync 'nginx/mime.types', mimeTypesTemplate(config)
    writeFileSync 'nginx/error.log'
    writeFileSync 'nginx/access.log'
    done()

  start: (done) ->
    exec "sudo nginx -c #{config.dir}/nginx/nginx.conf", logger.checkForError(done)

  stop: (done) ->
    exec "sudo nginx -s stop", -> done() #logger.checkForError(done)

  remove: (done) ->
    exec 'rm -rf nginx', logger.checkForError(done)
