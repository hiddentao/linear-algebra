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
    _throwError('[' + op + '] op1 is ' + arg1.rows  + ' x ' + arg1.cols + 
      ' and op2 is ' + arg2.rows + ' x ' + arg2.cols);
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
      this.rows = values.length;
      this.cols = values[0].length;
    } else {
      // row-vector
      this.data = [values];
      this.rows = 1;
      this.cols = values.length;
    }
  };




  /**
   * Clone this matrix.
   * @return {Matrix}
   */
  Matrix.prototype.clone = function() {
    return new Matrix(this.toArray());
  };




  /**
   * Get plain array version of this matrix.
   * 
   * @return {Array}
   */
  Matrix.prototype.toArray = function() {
    var thisData = this.data,
      rows = this.rows,
      cols = this.cols;

    var a = new Array(rows);

    for (var i = 0; i<rows; ++i) {
      a[i] = thisData[i].slice(0, cols);
    }

    return a;
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
   * Create a matrix of zeros.
   * @param {Integer} rows Number of rows.
   * @param {Integer} bols Number of bols.
   * @return {Matrix}
   */
  Matrix.zero = function(rows, cols) {
    var a = new Array(rows);

    for (var i=0; i<rows; ++i) {
      a[i] = new Array(cols);
      
      for (var j=0; j<cols; ++j) {
        a[i][j] = 0;
      }
    }
    return new Matrix(a);
  };



  /**
   * Reshape array into matrix.
   * 
   * @param {Array} values 1D array (vector)
   * @param {Number} rows Number of rows.
   * @param {Number} cols Number of cols.
   * 
   * @return {Matrix}
   */
  Matrix.reshapeFrom = function(values, rows, cols) {
    if (values.length !== rows * cols) {
      _throwError('cannot reshape array of length ' + values.length + ' into ' + rows  + 'x' +  cols + ' matrix');
    }

    var a = [];

    for (var i=0; i<values.length; i += cols) {
      a.push(values.slice(i, cols + i));
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


