

/**
 * Dot product.
 * 
 * @param  {Matrix} arg A Matrix.
 * 
 * @return {Matrix}
 */
Matrix.prototype.dot = function(op2) {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (cols !== rows2) {
    _throwSizeMismatchError('dot', this, op2);
  }

  // op1 = m x n
  // op2 = m2 x n2
  // op1 * op2 => m x n2

  var row, row2, col;

  var result = new Array(rows);

  for (row=0; row<rows; ++row) {
    result[row] = new Array(cols2);

    for (col=0; col<cols2; ++col) {
      result[row][col] = 0;

      for (row2=0; row2<rows2; ++row2) {
        result[row][col] += thisData[row][col] * op2[row2][col];
      }
    }
  }  

  return new Matrix(result);
};




/**
 * In-place version of dot().
 * 
 * @return this
 */
Matrix.prototype.dot_ = function(op2) {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (cols !== rows2) {
    _throwSizeMismatchError('dot_', this, op2);
  }

  // op1 = m x n
  // op2 = m2 x n2
  // op1 * op2 => m x n2

  var row, row2, col, tmp;

  for (row=0; row<rows; ++row) {
    // we need to keep a copy of this row since we'll be overwriting it in this.data
    tmp = thisData[row].slice(0, cols);

    for (col=0; col<cols2; ++col) {
      thisData[row][col] = 0;

      for (row2=0; row2<rows2; ++row2) {
        thisData[row][col] += tmp[col] * op2[row2][col];
      }
    }
  }  

  // update dimensions
  this.cols = cols2;

  return this;
};



