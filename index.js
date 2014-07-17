var normal = require('./dist/linear-algebra'),
  precision = require('./dist/linear-algebra.precision');


/** 
 * Initialise the library.
 * 
 * @param {Object} options Additional options.
 * @param {Function} [options.add] Function to add floating point numbers.
 * 
 * @return {Object} Linear algebra primitives.
 */
module.exports = function(options) {
  if (options.add) {
    return precision(options);
  } else {
    return normal(options);
  }
};

