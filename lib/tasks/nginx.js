var config, exec, filesSiteTemplate, linuxConfTemplate, logger, macConfTemplate, mimeTypesTemplate, os, partial, processSiteTemplate, series, writeFile, writeFileSync, _ref, _ref1;

partial = require('underscore').partial;

series = require('async').series;

exec = require('child_process').exec;

_ref = require('fs'), writeFile = _ref.writeFile, writeFileSync = _ref.writeFileSync;

os = require('os');

_ref1 = require('../utils'), config = _ref1.config, logger = _ref1.logger;

linuxConfTemplate = require('../templates/nginx.conf.linux');

macConfTemplate = require('../templates/nginx.conf.mac');

mimeTypesTemplate = require('../templates/mime.types');

filesSiteTemplate = require('../templates/site.files');

processSiteTemplate = require('../templates/site.process');

module.exports = {
  install: function(done) {
    var asyncActions, site;
    asyncActions = [];
    asyncActions.push(this.remove);
    asyncActions.push(this.installDir);
    asyncActions.push(this.installConf);
    for (site in config.project.sites) {
      asyncActions.push(partial(this.installOne, site));
    }
    return series(asyncActions, logger.checkForError(done));
  },
  installOne: function(name, done) {
    var site, template;
    site = config.project.getFormattedSite(name);
    template = site.process != null ? processSiteTemplate : filesSiteTemplate;
    return writeFile("nginx/sites-available/" + name, template(site), logger.checkForError(done));
  },
  installDir: function(done) {
    return exec('mkdir nginx && mkdir nginx/sites-available', done);
  },
  installConf: function(done) {
    var confTemplate;
    confTemplate = (function() {
      switch (os.platform()) {
        case 'darwin':
          return macConfTemplate;
        case 'linux':
          return linuxConfTemplate;
      }
    })();
    writeFileSync('nginx/nginx.conf', confTemplate(config));
    writeFileSync('nginx/mime.types', mimeTypesTemplate(config));
    writeFileSync('nginx/error.log');
    writeFileSync('nginx/access.log');
    return done();
  },
  start: function(done) {
    return exec("sudo nginx -c " + config.dir + "/nginx/nginx.conf", logger.checkForError(done));
  },
  stop: function(done) {
    return exec("sudo nginx -s stop", function() {
      return done();
    });
  },
  remove: function(done) {
    return exec('rm -rf nginx', logger.checkForError(done));
  }
};
