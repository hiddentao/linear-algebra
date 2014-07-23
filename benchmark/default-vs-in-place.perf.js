var base = require('./_base');


module.exports = {
  name: 'Default (new object) vs in-place modification',
  tests: {
    'Matrix dot-product - default': {
      fn: function() {
        var mat = base.buildMatrix(5, 5);
        return mat.dot(mat);
      }
    },
    'Matrix dot-product - in-place': {
      fn: function() {
        var mat = base.buildMatrix(5, 5);
        return mat.dot(mat);
      }
    },
    'Matrix transpose (rows > cols) - default': {
      fn: function() {
        var mat = base.buildMatrix(10, 5);
        return mat.trans();
      }
    },
    'Matrix transpose (rows > cols) - in-place': {
      fn: function() {
        var mat = base.buildMatrix(10, 5);
        return mat.trans_();
      }
    },
    'Matrix transpose (cols > rows) - default': {
      fn: function() {
        var mat = base.buildMatrix(5, 10);
        return mat.trans();
      }
    },
    'Matrix transpose (cols > rows) - in-place': {
      fn: function() {
        var mat = base.buildMatrix(5, 10);
        return mat.trans_();
      }
    },
  }
};
