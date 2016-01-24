Matrix.prototype.getSum = function(axis) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var _getSum = function(that) {
    var thisData = that.data,
      rows = that.rows,
      cols = that.cols;

    var arr = new Array(rows);
    for (var i = 0; i<rows; ++i) {
      var sum = 0;
      for (var j = 0; j<cols; ++j) {
        sum += thisData[i][j];
      }
      arr[i] = sum;
    }
    return arr;
  };

  if (axis === 0) {
    return _getSum(this.trans());
  } else if (axis === 1) {
    return _getSum(this);
  } else if (axis === null || axis === undefined) {
    var sum = 0;
    for (var i = 0; i<rows; ++i) {
      for (var j = 0; j<cols; ++j) {
        sum += thisData[i][j];
      }
    }
    return sum;
  } else {
    _throwError('[getSum] axis is ' + axis);
  }
};
