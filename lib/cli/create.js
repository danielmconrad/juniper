var ask, fs, init, logger, _ref;

fs = require('fs');

_ref = require('../utils'), ask = _ref.ask, logger = _ref.logger;

init = require('./init');

module.exports = function(actionArgs, done) {
  var newFolder, next, projectName;
  if (!actionArgs.length) {
    return logger.error('Please provide a project name.');
  }
  projectName = actionArgs[0];
  newFolder = (process.cwd()) + "/" + projectName;
  next = function() {
    process.chdir(newFolder);
    return init(done);
  };
  if (fs.existsSync(newFolder)) {
    return next();
  } else {
    return fs.mkdir(newFolder, function(err) {
      if (err) {
        return logger.error('Could not create folder.');
      }
      logger.success('Project folder created.');
      return next();
    });
  }
};
