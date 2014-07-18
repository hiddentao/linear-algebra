var linearAlgebra = require('../index');

var normalPrecision = linearAlgebra();

var highPrecision = linearAlgebra({
  add: require('add')
});


/** 
 * Build a matrix of random numbers with given matrix class.
 * @return {MatrixClass}
 */
var buildMatrix = function(MatrixClass, size) {
  var a = new Array(size);

  for (var i=0; i<size; ++i) {
    a[i] = new Array(size);

    for (var j=0; j<size; ++j) {
      a[i][j] = Math.random() * 10000;
    }
  }

  return new MatrixClass(a);
};


var normal5 = buildMatrix(normalPrecision.Matrix, 5);
var normal30 = buildMatrix(normalPrecision.Matrix, 30);

var high5 = buildMatrix(highPrecision.Matrix, 5);
var high30 = buildMatrix(highPrecision.Matrix, 30);


module.exports = {
  name: 'Normal vs High precision - matrix multiplication',
  tests: {
    'Normal precision (5x5 matrix)': {
      fn: function() {
        return normal5.mul(normal5);
      }
    },
    'Normal precision (30x30 matrix)': {
      fn: function() {
        return normal30.mul(normal30);
      }
    },
    'High precision (5x5 matrix)': {
      fn: function() {
        return high5.mul(high5);
      }
    },
    'High precision (30x30 matrix)': {
      fn: function() {
        return high30.mul(high30);
      }
    },
  }
};
