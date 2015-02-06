var applyEach, start, stop;

start = require('./start');

stop = require('./stop');

applyEach = require('async').applyEach;

module.exports = function(siteName, done) {
  return applyEach([stop, start], siteName, function() {
    return typeof done === "function" ? done() : void 0;
  });
};
