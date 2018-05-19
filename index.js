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
var linearAlgebra = module.exports = (function(options) {
  options = options || {};
  
  return(options.add ? precision(options) : normal(options));
})();
