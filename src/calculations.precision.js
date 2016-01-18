/**
 * @fileOverview  High precision version.
 */




/**
 * Sum every element.
 * @return {Number}
 */
Matrix.prototype.getSum = function(value) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var sum = new Array(rows * cols);

  for (var i = 0, jBase = 0; i<rows; ++i, jBase += cols) {
    for (var j = 0; j<cols; ++j) {
      sum[jBase + j] = thisData[i][j];
    }
  }
  
  return adder(sum); 
};

/**
 * Calculate norm of every element.
 * @return {Number}
 */
Matrix.prototype.getNorm = function() {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var nnorm = new Array(rows * cols);

  for (var i = 0, jBase = 0; i<rows; ++i, jBase += cols) {
    for (var j = 0; j<cols; ++j) {
      nnorm[jBase + j] = Math.pow(Math.abs(thisData[i][j]), 2);
    }
  }

 return Math.sqrt(adder(nnorm));
};
