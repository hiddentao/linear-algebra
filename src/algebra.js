/**
 * @fileOverview  Basic arithmetic operations
 */




/**
 * Transpose this matrix.
 * @return {Matrix}
 */
Matrix.prototype.trans = function() {

  // data of this matrix
  var thisData = this.data,
    thisRows = this.rows, 
    thisCols = this.cols;

  var result = new Array(thisCols);

  // actual transpose procedure
  for (var col=0; col < thisCols; ++col) {
    result[col] = new Array(thisRows);
    
    for (var row=0; row < thisRows; ++row) {
      result[col][row] = thisData[row][col];
    }
  }

  return new Matrix(result);
};






/**
 * In-place version of trans().
 * @return this
 */
Matrix.prototype.trans_ = function() {
  var thisData = this.data,
    thisRows = this.rows, 
    thisCols = this.cols;

  var row, col, t;

  // first we transpose the matrix upto length of shortest side
  var isSquare = (thisCols === thisRows);
  var shortestSide = (thisCols > thisRows) ? thisRows : thisCols;

  for (row=0; row<shortestSide; ++row) {
    for (col=row + 1; col<shortestSide; ++col) {
      t = thisData[col][row];
      thisData[col][row] = thisData[row][col];
      thisData[row][col] = t;
    }
  }

  // now we transpose the rest of the matrix
  if (!isSquare) {
    if (thisCols > thisRows) {
      // do a column at a time
      for (col=thisRows; thisCols > col; ++col) {
        if (!Array.isArray(thisData[col])) {
          thisData[col] = new Array(thisRows);
        }

        for (row=0; row<thisRows; ++row) {
          thisData[col][row] = thisData[row][col];
        }
      }
    }
    else {
      // do a row at a time
      for (row=thisCols; thisRows > row; ++row) {
        for (col=0; thisCols > col; ++col) {
          thisData[col][row] = thisData[row][col];
        }
      }
    }
    
    // finally, we update the "official" dimensions
    t = thisRows;
    this.rows = thisCols;
    this.cols = t;
  }


  return this;
};



BUILD(ALGEBRA_OP, div, thisData[row][col] / op2Data[row][col])
BUILD(ALGEBRA_OP, mul, thisData[row][col] * op2Data[row][col])
BUILD(ALGEBRA_OP, plus, thisData[row][col] + op2Data[row][col])
BUILD(ALGEBRA_OP, minus, thisData[row][col] - op2Data[row][col])




