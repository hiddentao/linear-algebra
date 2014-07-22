(function (root, factory) {
  "use strict";

  // AMD
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  }
  // CommonJS
  else if (typeof exports === 'object') {
    module.exports = factory();
  }
  // Browser
  else {
    root.linearAlgebra = factory();
  }
})(this, function () {
  "use strict";


  var _throwError = function(msg) {
    throw new Error('linear-algebra: ' + msg);
  };


  var _throwSizeMismatchError = function(op, arg1, arg2) {
    _throwError(op + ': op1 is ' + arg1.rows  + ' * ' + arg1.cols + 
      ' and op2 is ' + arg2.rows + ' * ' + arg2.cols);
  };


  /**
   * Initialise the linear algebra library.
   *
   * @param {Object} options Additional options.
   * @param {Function} [options.add] Function to add floating point numbers.
   * 
   * @return {Object} Linear algebra primitives.
   */
  return function(options) {
    options = options || {};

    
/**
 * @fileOverview  Initialization options
 */


// function to add floating point values
if (options.add) {
  console.warn('linear-algebra: adder (options.add) will not be used in non-precision version');
}

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









/**
 * Dot-product - multiply with given matrix.
 * 
 * @param  {Matrix} arg A Matrix.
 * 
 * @return this
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




/**
 * Sum every element.
 * @return {Number}
 */
Matrix.prototype.getSum = function(value) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var sum = 0;

  for (var i = 0; i<rows; ++i) {
    for (var j = 0; j<cols; ++j) {
      sum += thisData[i][j];
    }
  }
  
  return sum; 
};


/**
 * Apply mathematical function to all elements in this matrix.
 *
 * @param {Function} transformFn With signature (double) => double
 * 
 * @return this
 */
Matrix.prototype.apply = function(transformFn) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] = transformFn(thisData[row][col]);
    }
  }  

  return this;
};




/**
 * Calculate the natural log (ln) all the elements.
 * 
 * @return this
 */
Matrix.prototype.ln = function() {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] = Math.log(thisData[row][col]);
    }
  }  

  return this;
};



/**
 * Calculate the sigmoid function of all the elements.
 *
 * See http://en.wikipedia.org/wiki/Sigmoid_function
 * 
 * @return this
 */
Matrix.prototype.sigmoid = function() {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col;

  for (row=0; row<rows; ++row) {
    for (col=0; col<cols; ++col) {
      thisData[row][col] = (1 / (1 + Math.exp(-thisData[row][col])));
    }
  }  

  return this;
};







/**
 * Multiply every element with given value.
 * @param  {Number} value Value to multiple with.
 * @return this
 */
Matrix.prototype.mul = function(value) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col;

  for (row = 0; row<rows; ++row) {
    for (col = 0; col<cols; ++col) {
      thisData[row][col] *= value;
    }
  }

  return this; 
};





/**
 * Add given value to every element.
 * @param  {Number} value Value to add.
 * @return this
 */
Matrix.prototype.plus = function(value) {
  var thisData = this.data,
    rows = this.rows,
    cols = this.cols;

  var row, col;

  for (row = 0; row<rows; ++row) {
    for (col = 0; col<cols; ++col) {
      thisData[row][col] += value;
    }
  }

  return this; 
};






    return LinAlg;
  };
});

