var config, exec, logger, partial, series, _ref;

partial = require('underscore').partial;

series = require('async').series;

exec = require('child_process').exec;

_ref = require('../utils'), config = _ref.config, logger = _ref.logger;

module.exports = {
  install: function(done) {
    var asyncActions, site;
    asyncActions = [];
    asyncActions.push(this.remove);
    for (site in config.project.sites) {
      asyncActions.push(partial(this.installOne, site));
    }
    return series(asyncActions, logger.checkForError(done));
  },
  installOne: function(name, done) {
    var site;
    site = config.project.sites[name];
    return exec("git clone " + site.repo + " repos/" + name, logger.checkForError(done));
  },
  start: function(done) {
    var asyncActions, site;
    asyncActions = [];
    for (site in config.project.sites) {
      asyncActions.push(partial(this.startOne, site));
    }
    return series(asyncActions, done);
  },
  startOne: function(name, done) {
    var site;
    site = config.project.getFormattedSite(name);
    if (!site.start) {
      return done();
    }
    return exec("cd " + site.files.root + " && " + site.start, logger.checkForError(done));
  },
  stop: function(done) {
    var asyncActions, site;
    asyncActions = [];
    for (site in config.project.sites) {
      asyncActions.push(partial(this.stopOne, site));
    }
    return series(asyncActions, done);
  },
  stopOne: function(name, done) {
    var site;
    site = config.project.getFormattedSite(name);
    if (!site.stop) {
      return done();
    }
    return exec("cd " + site.files.root + " && " + site.stop, function() {
      return done();
    });
  },
  remove: function(done) {
    return exec("rm -rf repos", logger.checkForError(done));
  }
};
