var colors,
  __slice = [].slice;

colors = require('colors');

colors.setTheme({
  debug: 'blue',
  error: 'red',
  info: 'grey',
  juniper: 'green',
  started: 'yellow',
  success: 'green',
  warning: 'magenta'
});

module.exports = {
  debug: function() {
    return console.log.apply(console, ["[juniper-debug]    ".debug].concat(__slice.call(arguments)));
  },
  error: function() {
    return console.log.apply(console, ["[juniper-error]    ".error].concat(__slice.call(arguments)));
  },
  info: function() {
    return console.log.apply(console, ["[juniper-info]     ".info].concat(__slice.call(arguments)));
  },
  started: function() {
    return console.log.apply(console, ["[juniper-started]  ".started].concat(__slice.call(arguments)));
  },
  success: function() {
    return console.log.apply(console, ["[juniper-success]  ".success].concat(__slice.call(arguments)));
  },
  warning: function() {
    return console.log.apply(console, ["[juniper-warning]  ".warning].concat(__slice.call(arguments)));
  },
  checkForError: function(done) {
    return (function(_this) {
      return function(err) {
        if (err) {
          return _this.error(err);
        }
        return done();
      };
    })(this);
  }
};