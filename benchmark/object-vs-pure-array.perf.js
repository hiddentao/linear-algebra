var base = require('./_base');

var mat = base.buildMatrix(5);
var vec = base.buildVector(5);

var matData = mat.data();
var vecData = vec.data();


var pureArrayMul = function(mat, vec) {
  var vl = vec.length,
    ml = mat.length;

  result = new Array(vl);

  for (i=0; i<ml; ++i) {
    result[i] = 0;
    for (j=0; j<vl; ++j) {
      result[i] += mat[i][j] * vec[j];
    }
  }

  return result;
};


module.exports = {
  name: 'Object vs Pure array',
  tests: {
    'Matrix x Vector -> Vector': {
      fn: function() {
        return mat.mul(vec);
      }
    },
    '2-dim-array x 1-dim-array -> 1-dim-array': {
      fn: function() {
        return pureArrayMul(matData, vecData);
      }
    },
  }
};
