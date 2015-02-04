var logger, nginx, repos, series;

repos = require('../tasks/repos');

nginx = require('../tasks/nginx');

logger = require('../utils').logger;

series = require('async').series;

module.exports = function() {
  return series([
    function(cb) {
      logger.info('Stopping project repos...');
      return repos.stop(function(err) {
        if (err) {
          return logger.error(err);
        }
        logger.success('Project repos stopped.');
        return cb();
      });
    }, function(cb) {
      logger.info('Stopping project nginx...');
      return nginx.stop(function(err) {
        if (err) {
          return logger.error(err);
        }
        logger.success('Project nginx stopped.');
        return cb();
      });
    }
  ]);
};