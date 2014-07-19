var base = require('./_base');

var normal5 = base.buildMatrix(5);
var normal30 = base.buildMatrix(30);

var high5 = base.buildMatrix(5, base.highPrecision.Matrix);
var high30 = base.buildMatrix(30, base.highPrecision.Matrix);


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
