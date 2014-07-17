/**
 * @fileOverview  Additional matrix operations for high precision version.
 */





/**
 * Compute dot product of given row with a vector.
 * 
 * @param {Number} rowNum 0-based row index.
 * @param  {Vector} vector.
 * 
 * @return {Number}
 */
Matrix.prototype.dot = function(rowNum, vector) {
  if (this._cols !== vector._dim) {
    _throwError('Vector dot product requires this.columns = vector.size');
  }

  var a = new Array(this._cols);

  for (var j=0; j<this._cols; ++j) {
    a[j] = this._data[rowNum][j] * vector._data[j];
  }

  return adder(a);
};





/**
 * Multiply this matrix by a matrix or vector.
 * @param  {Matrix|Vector} arg Matrix or vector.
 * @return {Matrix|Vector} A Matrix or Vector depending on the result.
 */
Matrix.prototype.mul = function(arg) {
  var result, tmp, i, j, k;

  // matrix
  if (arg.isMatrix) {
    if (this._cols !== arg._rows) {
      _throwError('Multiplying by matrix requires this.columns = matrix.rows');
    }

    result = new Array(this._rows);
    tmp = new Array(this._cols);

    for (i=0; i<this._rows; ++i) {
      result[i] = new Array(arg._cols);

      for (k=0; k<arg._cols; ++k) {

        for (j=0; j<this._cols; ++j) {
          tmp[j] = this._data[i][j] * arg._data[j][k];
        }

        result[i][k] = adder(tmp);
      }
    }

    return new Matrix(result);
  }
  // vector
  else if (arg.isVector) {
    if (this._cols !== arg._dim) {
      _throwError('Multiplying by vector requires this.columns = vector.size');
    }

    result = new Array(this._rows);
    tmp = new Array(arg._dim);

    for (i=0; i<this._rows; ++i) {

      for (j=0; j<this._cols; ++j) {
        // store values to add in temporary array
        tmp[j] = this._data[i][j] * arg._data[j];
      }
      // add up the values
      result[i] = adder(tmp);
    }

    return new Vector(result);
  }
};
