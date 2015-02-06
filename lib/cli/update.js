var applyEach, repos, series, start, stop, _ref;

start = require('./start');

stop = require('./stop');

repos = require('../tasks').repos;

_ref = require('async'), applyEach = _ref.applyEach, series = _ref.series;

module.exports = function(siteName, done) {
  if (siteName != null) {
    return applyEach([stop, repos.updateOne, start], siteName, function() {
      return typeof done === "function" ? done() : void 0;
    });
  } else {
    return series([stop, repos.update, start], function() {
      return typeof done === "function" ? done() : void 0;
    });
  }
};
