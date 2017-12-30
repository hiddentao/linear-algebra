/**
 * @fileOverview  High precision version.
 */




/**
 * Sum every element.
 * @return {Number}
 */
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
      var sum = new Array(cols);
      for (var j = 0; j<cols; ++j) {
        sum[j] = thisData[i][j];
      }
      arr[i] = adder(sum);
    }
    return arr;
  };

  if (axis === 0) {
    return _getSum(this.trans());
  } else if (axis === 1) {
    return _getSum(this);
  } else if (axis === null || axis === undefined) {
    var sum = new Array(rows * cols);
    for (var i = 0, jBase = 0; i<rows; ++i, jBase += cols) {
      for (var j = 0; j<cols; ++j) {
        sum[jBase + j] = thisData[i][j];
      }
    }
    return adder(sum);
  } else {
    _throwError('[getSum] axis is ' + axis);
  }
};
