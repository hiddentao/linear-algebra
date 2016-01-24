Matrix.prototype.NAME = function(axis) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var _NAME = function(that) {
    var thisData = that.data,
      rows = that.rows,
      cols = that.cols;

    var arr = new Array(rows);
    for (var i = 0; i<rows; ++i) {
      var val = thisData[i][0],
        idx = 0;
      for (var j = 0; j<cols; ++j) {
        if ('COND') {
          val = thisData[i][j];
          idx = j;
        }
      }
      arr[i] = 'EXPR';
    }
    return arr;
  }

  if (axis === 0) {
    return _NAME(this.trans());
  } else if (axis === 1) {
    return _NAME(this);
  } else if (axis === null || axis === undefined) {
    var val = thisData[0][0],
      idx = 0;
    for (var i = 0; i<rows; ++i) {
      for (var j = 0; j<cols; ++j) {
        if ('COND') {
          val = thisData[i][j];
          idx = cols * i + j
        }
      }
    }
    return 'EXPR';
  } else {
    _throwError('[NAME] axis is ' + axis);
  }
};
