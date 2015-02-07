var ask, askToContinue, configTemplate, fs, has, logger, writeFile, _ref;

fs = require('fs');

_ref = require('../utils'), ask = _ref.ask, has = _ref.has, logger = _ref.logger;

configTemplate = require('../templates/config.cson.js');

module.exports = function(done) {
  var content, file, onAnswer;
  file = (process.cwd()) + "/config.cson";
  content = configTemplate();
  onAnswer = function() {
    writeFile(file, content);
    if (done != null) {
      return done();
    }
  };
  if (fs.existsSync(file)) {
    return askToContinue(onAnswer);
  } else {
    return onAnswer();
  }
};

askToContinue = function(onAnswer) {
  var question, warning;
  warning = 'Configuration file already exists.';
  question = 'Would you like to overwrite the file?';
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

writeFile = function(file, content) {
  return fs.writeFile(file, content, function(err) {
    if (err) {
      return logger.error(err);
    }
    return logger.success('Configuration created. \nNext up, modify your `config.cson` file to reflect your desired server configuration.');
  });
};
