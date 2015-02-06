var logger;

logger = require('./logger');

module.exports = function(done, successMessage) {
  return function(err) {
    if (err) {
      return logger.error(err);
    }
    if (successMessage) {
      logger.success(successMessage);
    }
    if (!successMessage) {
      logger.success('Done!');
    }
    return done();
  };
};
