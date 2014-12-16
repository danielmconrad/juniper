var colors;

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
  debug: function(output) {
    return console.log("[juniper-debug]".debug, output);
  },
  error: function(output) {
    return console.log("[juniper-error]".error, output);
  },
  info: function(output) {
    return console.log("[juniper-info]".info, output);
  },
  started: function(output) {
    return console.log("[juniper-started]".started, output);
  },
  success: function(output) {
    return console.log("[juniper-success]".success, output);
  },
  warning: function(output) {
    return console.log("[juniper-warning]".warning, output);
  }
};
