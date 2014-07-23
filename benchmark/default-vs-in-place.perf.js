var base = require('./_base');


module.exports = {
  name: 'Default (new object) vs in-place modification',
  tests: {
    'Matrix dot-product (5x5) - default': {
      fn: function() {
        var mat = base.buildMatrix(5, 5);
        return mat.dot(mat);
      }
    },
    'Matrix dot-product (5x5) - in-place': {
      fn: function() {
        var mat = base.buildMatrix(5, 5);
        return mat.dot_(mat);
      }
    },
    'Matrix dot-product (100x100) - default': {
      fn: function() {
        var mat = base.buildMatrix(100, 100);
        return mat.dot(mat);
      }
    },
    'Matrix dot-product (100x100) - in-place': {
      fn: function() {
        var mat = base.buildMatrix(100, 100);
        return mat.dot_(mat);
      }
    },
    'Matrix dot-product (500x500) - default': {
      fn: function() {
        var mat = base.buildMatrix(500, 500);
        return mat.dot(mat);
      }
    },
    'Matrix dot-product (500x500) - in-place': {
      fn: function() {
        var mat = base.buildMatrix(500, 500);
        return mat.dot_(mat);
      }
    },
    'Matrix transpose (1000x5) - default': {
      fn: function() {
        var mat = base.buildMatrix(1000, 5);
        return mat.trans();
      }
    },
    'Matrix transpose (1000x5) - in-place': {
      fn: function() {
        var mat = base.buildMatrix(1000, 5);
        return mat.trans_();
      }
    },
    'Multiple matrix operations - default': {
      fn: function() {
        var mat = base.buildMatrix(110, 100),
          mat2 = base.buildMatrix(110, 100);

        return mat2.dot(mat.mul(mat2).plus(mat2).trans());
      }
    },
    'Multiple matrix operations - in-place': {
      fn: function() {
        var mat = base.buildMatrix(110, 100),
          mat2 = base.buildMatrix(110, 100);

        return mat2.dot_(mat.mul_(mat2).plus_(mat2).trans_());
      }
    },
  }
};
