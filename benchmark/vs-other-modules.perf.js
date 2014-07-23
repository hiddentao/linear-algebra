var base = require('./_base');

var sylvester = require('sylvester');
// var linalg = require('linalg');


var sylvesterMat1 = sylvester.Matrix.create(base.buildArray(100, 100)),
  sylvesterMat2 = sylvester.Matrix.create(base.buildArray(100, 100));

var linalgMat1 = base.buildArray(100, 100),
  linalgMat2 = base.buildArray(100, 100);

var myMat1 = new base.Matrix(base.buildArray(100, 100)),
  myMat2 = new base.Matrix(base.buildArray(100, 100));


module.exports = {
  name: 'vs. other modules',
  tests: {
    'Matrix dot-product (100x100) - linear-algebra (this module)': {
      fn: function() {
        return myMat1.dot(myMat2);
      }
    },
    // 'Matrix dot-product (100x100) - lin-alg': {
    //   fn: function() {
    //     return linalg.dot(linalgMat1, linalgMat2);
    //   }
    // },
    'Matrix dot-product (100x100) - sylvester': {
      fn: function() {
        return sylvesterMat1.multiply(sylvesterMat2);
      }
    },
  }
};
