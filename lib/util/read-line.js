var readline;

readline = require('readline');

module.exports = function() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
};
