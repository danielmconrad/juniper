var applyEach, partial, repos, series, start, stop, _ref;

start = require('./start');

stop = require('./stop');

repos = require('../tasks').repos;

_ref = require('async'), applyEach = _ref.applyEach, series = _ref.series;

partial = require('underscore').partial;

module.exports = function(siteName, done) {
  if (siteName != null) {
    return applyEach([stop, repos.updateOne, start], siteName, function() {
      return typeof done === "function" ? done() : void 0;
    });
  } else {
    return series([partial(stop, null), repos.update, partial(start, null)], function() {
      return typeof done === "function" ? done() : void 0;
    });
  }
};
