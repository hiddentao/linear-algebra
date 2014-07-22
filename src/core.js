/**
 * @fileOverview  Basic objects and operations
 */



var LinAlg = {};


/**
 * Our common number array class.
 *
 * @param {Array} values 1D array (vector) or 2D array (matrix) with length >= 1.
 * 
 * @constructor
 */
var Matrix = LinAlg.Matrix = function(values) {
  if (Array.isArray(values[0])) {
    // matrix
    this.data = values;
    this.rows = this.data.length;
    this.cols = this.data[0];
  } else {
    // row-vector
    this.data = [values];
    this.rows = this.data[0];
    this.cols = values.length;
  }
};




/**
 * Clone this matrix.
 * @return {Matrix}
 */
Matrix.prototype.clone = function() {
  var thisData = this.data,
    rows = this.rows;

  var a = new Array(rows);

  for (var i = 0; i<rows; ++i) {
    a[i] = thisData[i].slice(0);
  }

  return new Matrix(a);
};









/**
 * Transpose this matrix.
 * @return this
 */
Matrix.prototype.trans = function() {
  var thisData = this.data,
    rows = this.rows, 
    cols = this.cols;

  var row, col, t;

  // first we transpose the matrix upto length of shortest side
  var isSquare = (cols === rows);
  var shortestSide = (cols > rows) ? rows : cols;

  for (row=0; row<shortestSide; ++row) {
    for (col=row + 1; col<shortestSide; ++col) {
      t = thisData[col][row];
      thisData[col][row] = thisData[row][col];
      thisData[row][col] = t;
    }
  }

  // now we transpose the rest of the matrix
  if (!isSquare) {
    if (cols > rows) {
      // do a column at a time
      for (col=rows; cols > col; ++col) {
        if (!Array.isArray(thisData[col])) {
          thisData[col] = new Array(rows);
        }

        for (row=0; row<rows; ++row) {
          thisData[col][row] = thisData[row][col];
        }
      }
    }
    else {
      // do a row at a time
      for (row=cols; rows > row; ++row) {
        for (col=0; cols > col; ++col) {
          thisData[col][row] = thisData[row][col];
        }
      }
    }
    
    // finally, we update the "official" dimensions
    t = rows;
    this.rows = cols;
    this.cols = t;
  }


  return this;
};







/**
 * Create an identity matrix of given dimensions.
 * @param  {Integer} dim Length of one side.
 * @return {Matrix}
 */
Matrix.identity = function(dim) {
  return Matrix.scalar(dim, 1);
};




/**
 * Create a scalar diagonal matrix.
 * @param {Integer} dim Matrix size (length of each side)
 * @param  {Number} entry The value to place in each diagonal.
 * @return {Matrix}
 */
Matrix.scalar = function(dim, entry) {
  var a = new Array(dim),
    i, j;

  for (i=0; i<dim; ++i) {
    a[i] = new Array(dim);

    for (j=0; j<dim; ++j) {
      a[i][j] = 0;
    }

    a[i][i] = entry;
  }

  return new Matrix(a);
};




/**
 * Helpers to create vectors, i.e. matrices with a single row.
 */
var Vector = LinAlg.Vector = {
  /**
   * Create a row-vector of zeros.
   * @param  {Integer} size Length of vector.
   * @return {Vector}
   */
  zero: function(size) {
    var a = new Array(size);

    for (var i=0; i<size; ++i) {
      a[i] = 0;
    }

    return new Matrix(a);    
  }
};






