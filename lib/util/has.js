var intersection;

intersection = require('underscore').intersection;

module.exports = function(array1, array2) {
  return !!intersection(array1, array2).length;
};
