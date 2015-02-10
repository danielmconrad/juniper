var config, doneErrHandler, exec, logger, partial, remove, series, _ref;

partial = require('underscore').partial;

series = require('async').series;

exec = require('child_process').exec;

remove = require('fs-extra').remove;

_ref = require('../utils'), config = _ref.config, logger = _ref.logger, doneErrHandler = _ref.doneErrHandler;

module.exports = {
  install: function(done) {
    var asyncActions, name;
    logger.started('Installing all project repos...');
    asyncActions = [];
    asyncActions.push(module.exports.remove);
    for (name in config.project.sites) {
      asyncActions.push(partial(module.exports.installOne, name));
    }
    return series(asyncActions, doneErrHandler(done));
  },
  installOne: function(name, done) {
    var site;
    logger.started("Installing site repo for " + name + "...");
    site = config.project.sites[name];
    exec("git clone " + site.repo + " repos/" + name, doneErrHandler(done));
    if (!site.install) {
      return done();
    }
    process.chdir(site.files.root);
    return exec(site.install, function(err) {
      if (err) {
        return logger.error(err);
      }
      process.chdir(config.dir);
      return done();
    });
  },
  start: function(done) {
    var asyncActions, name;
    logger.started('Starting all project repos...');
    asyncActions = [];
    for (name in config.project.sites) {
      asyncActions.push(partial(module.exports.startOne, name));
    }
    return series(asyncActions, doneErrHandler(done));
  },
  startOne: function(name, done) {
    var site;
    logger.started("Starting site repo for " + name);
    site = config.project.getFormattedSite(name);
    if (!site.start) {
      return done();
    }
    process.chdir(site.files.root);
    return exec(site.start, function(err) {
      if (err) {
        return logger.error(err);
      }
      process.chdir(config.dir);
      return done();
    });
  },
  stop: function(done) {
    var asyncActions, name;
    logger.started('Stopping all project repos...');
    asyncActions = [];
    for (name in config.project.sites) {
      asyncActions.push(partial(module.exports.stopOne, name));
    }
    return series(asyncActions, doneErrHandler(done));
  },
  stopOne: function(name, done) {
    var site;
    logger.started("Stopping site repo for " + name);
    site = config.project.getFormattedSite(name);
    if (!site.stop) {
      return done();
    }
    process.chdir(site.files.root);
    return exec(site.stop, function(err) {
      process.chdir(config.dir);
      return done();
    });
  },
  remove: function(done) {
    return remove('repos', doneErrHandler(done));
  },
  removeOne: function(name, done) {
    return remove("repos/" + name, doneErrHandler(done));
  },
  update: function(done) {
    var asyncActions, name;
    logger.started('Updating all project repos...');
    asyncActions = [];
    for (name in config.project.sites) {
      asyncActions.push(partial(module.exports.updateOne, name));
    }
    return series(asyncActions, doneErrHandler(done));
  },
  updateOne: function(name, done) {
    var site;
    logger.started("Updating site repo for " + name);
    site = config.project.getFormattedSite(name);
    process.chdir(site.files.root);
    return exec("git checkout " + site.branch + " && git pull", function(err) {
      if (err) {
        return logger.error(err);
      }
      process.chdir(config.dir);
      logger.success('Done!');
      return done();
    });
  }
};
