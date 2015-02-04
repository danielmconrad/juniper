var ask, config, exec, logger, nginx, repos, series, _ref, _ref1;

repos = require('../tasks/repos');

nginx = require('../tasks/nginx');

_ref = require('../utils'), ask = _ref.ask, logger = _ref.logger;

series = require('async').series;

exec = require('child_process').exec;

_ref1 = require('../utils'), config = _ref1.config, logger = _ref1.logger;

module.exports = function() {
  var question, warning;
  warning = 'This will stop all services and delete the project.';
  question = 'Are you sure you want to delete the project?';
  return ask.yesOrNo({
    warning: warning,
    question: question
  }, function(yep) {
    if (!yep) {
      return logger.warning('Exiting.');
    }
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
      }, function(cb) {
        logger.info('Removing project repos...');
        return repos.remove(function(err) {
          if (err) {
            return logger.error(err);
          }
          logger.success('Project repos removed.');
          return cb();
        });
      }, function(cb) {
        logger.info('Removing project');
        return exec("rm -rf " + config.dir, function() {
          return cb();
        });
      }
    ]);
  });
};
