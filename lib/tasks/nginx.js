var config, doneErrHandler, exec, filesSiteTemplate, linuxConfTemplate, logger, macConfTemplate, mimeTypesTemplate, mkdirp, partial, platform, processSiteTemplate, remove, series, writeFile, writeFileSync, _ref, _ref1, _ref2;

partial = require('underscore').partial;

series = require('async').series;

exec = require('child_process').exec;

_ref = require('fs'), writeFile = _ref.writeFile, writeFileSync = _ref.writeFileSync;

_ref1 = require('fs-extra'), mkdirp = _ref1.mkdirp, remove = _ref1.remove;

platform = require('os').platform;

_ref2 = require('../utils'), config = _ref2.config, logger = _ref2.logger, doneErrHandler = _ref2.doneErrHandler;

linuxConfTemplate = require('../templates/nginx.conf.linux');

macConfTemplate = require('../templates/nginx.conf.mac');

mimeTypesTemplate = require('../templates/mime.types');

filesSiteTemplate = require('../templates/site.files');

processSiteTemplate = require('../templates/site.process');

module.exports = {
  install: function(done) {
    var asyncActions, name;
    logger.started('Installing all project nginx...');
    asyncActions = [];
    asyncActions.push(module.exports.remove);
    asyncActions.push(module.exports.installDir);
    asyncActions.push(module.exports.installConf);
    for (name in config.project.sites) {
      asyncActions.push(partial(module.exports.installOne, name));
    }
    return series(asyncActions, doneErrHandler(done, 'Project nginx installed.'));
  },
  installOne: function(name, done) {
    var site, template;
    logger.started("Installing site nginx for " + name);
    site = config.project.getFormattedSite(name);
    template = site.process != null ? processSiteTemplate : filesSiteTemplate;
    return writeFile("nginx/sites-available/" + name, template(site), doneErrHandler(done));
  },
  installDir: function(done) {
    return mkdirp('nginx/sites-available', done);
  },
  installConf: function(done) {
    var confTemplate;
    confTemplate = (function() {
      switch (platform()) {
        case 'darwin':
          return macConfTemplate;
        case 'linux':
          return linuxConfTemplate;
      }
    })();
    writeFileSync('nginx/nginx.conf', confTemplate(config));
    writeFileSync('nginx/mime.types', mimeTypesTemplate(config));
    writeFileSync('nginx/error.log', '');
    writeFileSync('nginx/access.log', '');
    return done();
  },
  remove: function(done) {
    return remove('nginx', function(err) {
      return done();
    });
  },
  removeOne: function(name, done) {
    return remove("nginx/sites-available/" + name, function(err) {
      return done();
    });
  },
  start: function(done) {
    var handler;
    logger.started('Starting project nginx...');
    handler = doneErrHandler(done);
    return exec("sudo nginx -c " + config.dir + "/nginx/nginx.conf", handler);
  },
  startOne: function(name, done) {
    return module.exports.start(done);
  },
  stop: function(done) {
    logger.started('Stopping project nginx...');
    return exec('sudo nginx -s stop', function() {
      logger.success('Done!');
      return done();
    });
  },
  stopOne: function(name, done) {
    return module.exports.stop(done);
  }
};
