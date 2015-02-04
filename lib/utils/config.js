var CSON, clone, defaults, dir, e, extend, getFormattedSite, juniper, project, _ref;

_ref = require('underscore'), defaults = _ref.defaults, extend = _ref.extend;

clone = require('clone');

CSON = require('cson');

juniper = CSON.parseFileSync("" + __dirname + "/../../config.cson");

dir = process.cwd();

try {
  project = CSON.parseFileSync("" + (process.cwd()) + "/config.cson");
} catch (_error) {
  e = _error;
}

getFormattedSite = function(name) {
  var absoluteRoot, formattedRedirects, formattedSite, redirect, relativeRoot, site, _i, _len, _ref1;
  formattedSite = clone(project.sites[name]);
  if (formattedSite.files == null) {
    formattedSite.files = {};
  }
  defaults(formattedSite, juniper.defaults.site.all);
  defaults(formattedSite.files, juniper.defaults.site.files);
  if (formattedSite.process) {
    defaults(formattedSite.process, juniper.defaults.site.process);
  }
  if (formattedSite.files.redirects != null) {
    formattedRedirects = [];
    _ref1 = formattedSite.files.redirects;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      redirect = _ref1[_i];
      site = getFormattedSite(redirect.site);
      site.dir = redirect.dir;
      formattedRedirects.push(site);
    }
    formattedSite.files.redirects = formattedRedirects;
  }
  relativeRoot = formattedSite.files.root;
  absoluteRoot = "" + dir + "/repos/" + name;
  if (relativeRoot) {
    absoluteRoot += "/" + relativeRoot;
  }
  formattedSite.files.root = absoluteRoot;
  return formattedSite;
};

module.exports = {
  juniper: juniper,
  project: extend(project, {
    getFormattedSite: getFormattedSite
  }),
  dir: dir
};
