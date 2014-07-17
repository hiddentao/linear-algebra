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
var linearAlgebra = module.exports = function(options) {
  options = options || {};
  
  if (options.add) {
    return linearAlgebra._precision(options);
  } else {
    return linearAlgebra._normal(options);
  }
};


// to make testing easier
linearAlgebra._normal = normal;
linearAlgebra._precision = precision;

