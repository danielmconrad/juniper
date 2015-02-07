var logger, readline;

readline = require('readline');

logger = require('./logger');

module.exports = {
  yesOrNo: function(_arg, cb) {
    var question, rl, warning;
    warning = _arg.warning, question = _arg.question;
    logger.warning(warning);
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    return rl.question(question + " (Y/n) ", function(answer) {
      rl.close();
      return cb(answer.toLowerCase() === 'y');
    });
  }
};
