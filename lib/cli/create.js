var ask, askToContinue, fs, init, logger, makeFolder, _ref;

fs = require('fs');

_ref = require('../util'), ask = _ref.ask, logger = _ref.logger;

init = require('./init');

module.exports = function(actionArgs) {
  var folder, newFolder, onAnswer, projectName;
  if (!actionArgs.length) {
    return logger.error('Please provide a project name.');
  }
  projectName = actionArgs[0];
  folder = process.cwd();
  newFolder = "" + folder + "/" + projectName;
  onAnswer = function() {
    return init([newFolder, '-f']);
  };
  if (fs.existsSync(newFolder)) {
    return askToContinue(onAnswer);
  } else {
    return makeFolder();
  }
};

askToContinue = function(onAnswer) {
  var question, warning;
  warning = 'Project folder already exists.';
  question = 'Would you like to overwrite the folder?';
  return ask.yesOrNo({
    warning: warning,
    question: question
  }, function(yep) {
    if (!yep) {
      return logger.warning('Exiting.');
    }
    return onAnswer();
  });
};

makeFolder = function(newFolder) {
  return fs.mkdir(newFolder, function(err) {
    if (err) {
      return logger.error('Could not create folder.');
    }
    logger.success('Project folder created.');
    return init([newFolder]);
  });
};
