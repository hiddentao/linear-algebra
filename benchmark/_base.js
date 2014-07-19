var linearAlgebra = require('../index');

var normalPrecision = exports.normalPrecision = linearAlgebra();

var highPrecision = exports.highPrecision = linearAlgebra({
  add: require('add')
});


exports.Vector = normalPrecision.Vector;
exports.Matrix = normalPrecision.Matrix;


/** 
 * Build a matrix of random numbers with given matrix class.
 * @return {MatrixClass}
 */
exports.buildMatrix = function(size, MatrixClass) {
  if (!MatrixClass) {
    MatrixClass = normalPrecision.Matrix;
  }

  var a = new Array(size);

  for (var i=0; i<size; ++i) {
    a[i] = new Array(size);

    for (var j=0; j<size; ++j) {
      a[i][j] = Math.random() * 10000;
    }
  }

  return new MatrixClass(a);
};




/** 
 * Build a vector of random numbers with given vector class.
 * @return {VectorClass}
 */
exports.buildVector = function(size, VectorClass) {
  if (!VectorClass) {
    VectorClass = normalPrecision.Vector;
  }
  
  var a = new Array(size);

  for (var i=0; i<size; ++i) {
    a[i] = Math.random() * 10000;
  }

  return new VectorClass(a);
};



