var base = require('./_base');

var normal5 = base.buildMatrix(5, 5);
var normal30 = base.buildMatrix(30, 30);

var high5 = base.buildMatrix(5, 5, base.highPrecision.Matrix);
var high30 = base.buildMatrix(30, 30, base.highPrecision.Matrix);


module.exports = {
  name: 'Normal vs High precision',
  tests: {
    'Normal precision (5x5 matrix dot-product)': {
      fn: function() {
        return normal5.dot(normal5);
      }
    },
    'High precision (5x5 matrix dot-product)': {
      fn: function() {
        return high5.dot(high5);
      }
    },
    'Normal precision (30x30 matrix dot-product)': {
      fn: function() {
        return normal30.dot(normal30);
      }
    },
    'High precision (30x30 matrix dot-product)': {
      fn: function() {
        return high30.dot(high30);
      }
    },
  }
};
