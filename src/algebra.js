/**
 * @fileOverview  Basic arithmetic operations
 */




/**
 * Multiply each element with its corresponding element in matrix.
 * 
 * @param  {Matrix} arg A Matrix.
 * 
 * @return this
 */
Matrix.prototype.mulEach = function(op2) {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (rows !== rows2 || cols !== cols2) {
    _throwSizeMismatchError('mulEach', this, op2);
  }

  // op1 = m x n
  // op2 = m x n
  // op1 * op2 => m x n

  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] *= op2Data[row][col];
    }
  }  

  return this;
};






/**
 * Subtract each value of given matrix from this matrix.
 * 
 * @param  {Matrix} op2 Matrix to subtract from this one.
 * 
 * @return this
 */
Matrix.prototype.minusEach = function(op2) {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (rows !== rows2 || cols !== cols2) {
    _throwSizeMismatchError('minusEach', this, op2);
  }

  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] -= op2Data[row][col];
    }
  }  

  return this;
};





/**
 * Add each value of given matrix to this matrix.
 * 
 * @param  {Matrix} op2 Matrix to add to this one.
 * 
 * @return this
 */
Matrix.prototype.plusEach = function(op2) {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols,
    op2Data = op2.data,
    rows2 = op2.rows,
    cols2 = op2.cols;

  if (rows !== rows2 || cols !== cols2) {
    _throwSizeMismatchError('plusEach', this, op2);
  }

  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] += op2Data[row][col];
    }
  }  

  return this;
};







