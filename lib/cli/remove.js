var applyEach, ask, exec, logger, nginx, remove, repos, series, _ref, _ref1, _ref2;

_ref = require('../tasks'), nginx = _ref.nginx, repos = _ref.repos;

_ref1 = require('../utils'), ask = _ref1.ask, logger = _ref1.logger;

_ref2 = require('async'), applyEach = _ref2.applyEach, series = _ref2.series;

remove = require('fs-extra').remove;

exec = require('child_process').exec;

module.exports = function(siteName, done) {
  var question, removeProject, warning;
  if (siteName != null) {
    return applyEach([repos.stopOne, nginx.stopOne, nginx.removeOne, repos.removeOne], siteName, function() {
      return typeof done === "function" ? done() : void 0;
    });
  } else {
    warning = 'This will stop all services and delete the project.';
    question = 'Are you sure you want to delete the project?';
    removeProject = function(cb) {
      logger.info('Removing project');
      return remove(process.cwd(), cb);
    };
    return ask.yesOrNo({
      warning: warning,
      question: question
    }, function(yep) {
      if (!yep) {
        return logger.warning('Exiting.');
      }
      return series([repos.stop, nginx.stop, removeProject], function() {
        return typeof done === "function" ? done() : void 0;
      });
    });
  }
};
