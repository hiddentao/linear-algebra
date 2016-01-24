/**
 * @fileOverview  High precision version.
 */




/**
 * Sum every element.
 * @return {Number}
 */
Matrix.prototype.getSum = function(axis) {
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
    return new Matrix(_getSum(this.trans()));
  } else if (axis === 1) {
    return new Matrix(_getSum(this));
  } else if (axis === null || axis === undefined) {
    var arr = _getSum(this);
    var sum = new Array(arr.length);
    for (var i = 0; i<arr.length; ++i) {
      sum[i] = arr[i];
    }
    return adder(sum);
  } else {
    _throwError('[getSum] axis is ' + axis);
  }
};
