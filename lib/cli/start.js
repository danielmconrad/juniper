var logger, nginx, repos, series;

repos = require('../tasks/repos');

nginx = require('../tasks/nginx');

logger = require('../utils').logger;

series = require('async').series;

module.exports = function() {
  return series([
    function(cb) {
      logger.info('Starting project repos...');
      return repos.start(function(err) {
        if (err) {
          return logger.error(err);
        }
        logger.success('Project repos started.');
        return cb();
      });
    }, function(cb) {
      logger.info('Starting project nginx...');
      return nginx.start(function(err) {
        if (err) {
          return logger.error(err);
        }
        logger.success('Project nginx started.');
        return cb();
      });
    }
  ]);
};
