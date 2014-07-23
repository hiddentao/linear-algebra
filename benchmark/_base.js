var linearAlgebra = require('../index');

var normalPrecision = exports.normalPrecision = linearAlgebra();

var highPrecision = exports.highPrecision = linearAlgebra({
  add: require('add')
});


exports.Matrix = normalPrecision.Matrix;


/** 
 * Build a matrix of random numbers with given matrix class.
 * @return {MatrixClass}
 */
exports.buildMatrix = function(rows, cols, MatrixClass) {
  if (!MatrixClass) {
    MatrixClass = normalPrecision.Matrix;
  }

  var a = new Array(rows);

  for (var i=0; i<rows; ++i) {
    a[i] = new Array(cols);

    for (var j=0; j<cols; ++j) {
      a[i][j] = Math.random() * 10000;
    }
  }

  return new MatrixClass(a);
};



