var logger, nginx, repos, series;

repos = require('../tasks/repos');

nginx = require('../tasks/nginx');

logger = require('../utils').logger;

series = require('async').series;

module.exports = function() {
  return series([
    function(cb) {
      logger.info('Installing project nginx...');
      return nginx.install(function(err) {
        if (err) {
          return logger.error(err);
        }
        logger.success('Project nginx installed.');
        return cb();
      });
    }, function(cb) {
      logger.info('Installing project repos...');
      return repos.install(function(err) {
        if (err) {
          return logger.error(err);
        }
        logger.success('Project repos installed.');
        return cb();
      });
    }
  ]);
};
