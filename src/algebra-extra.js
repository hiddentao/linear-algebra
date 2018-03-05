

/**
 * Dot product.
 * 
 * @param  {Matrix} arg A Matrix.
 * 
 * @return {Matrix}
 */
Matrix.prototype.dot = function(op2) {
  var thisData = this.data,   // data of this matrix
    thisRows = this.rows, 
    thisCols = this.cols,
    op2Data = op2.data, // data of the other matrix
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (thisCols !== rows2) {
    _throwSizeMismatchError('dot', this, op2);
  }

  // op1 = m x n
  // op2 = m2 x n2
  // op1 * op2 => m x n2

  var row, row2, col2;

  var result = new Array(thisRows);

  for (row=0; row<thisRows; ++row) {
    result[row] = new Array(cols2);

    for (col2=0; col2<cols2; ++col2) {
      result[row][col2] = 0;

      for (row2=0; row2<rows2; ++row2) {
        result[row][col2] += thisData[row][row2] * op2Data[row2][col2];
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
    thisRows = this.rows, 
    thisCols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (thisCols !== rows2) {
    _throwSizeMismatchError('dot_', this, op2);
  }

  // op1 = m x n
  // op2 = m2 x n2
  // op1 * op2 => m x n2

  var row, row2, col2, tmp;

  for (row=0; row<thisRows; ++row) {
    // we need to keep a copy of this row since we'll be overwriting it in this.data
    tmp = thisData[row].slice(0, thisCols);

    for (col2=0; col2<cols2; ++col2) {
      thisData[row][col2] = 0;

      for (row2=0; row2<rows2; ++row2) {
        thisData[row][col2] += tmp[row2] * op2Data[row2][col2];
      }
    }
  }  

  // update dimensions
  this.cols = cols2;

  return this;
};



