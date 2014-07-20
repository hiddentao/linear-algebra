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
 * @fileOverview  Initialization options for high-precision version
 */


// function to add floating point values
var adder = options.add;

if (!adder) {
  _throwError('options.add must be set for precision calculation');
}

/**
 * @fileOverview  Basic objects and operations
 */



var LinAlg = {};




// ------------------------------
// Vectors
// ------------------------------


/** 
 * Construct a vector.
 *
 * @param {Array} data Array of values representing vector.
 * 
 * @constructor
 */
var Vector = LinAlg.Vector = function(data) {
  this.data = data;
  this.size = data.length;
};


/**
 * Is this a vector?
 */
Object.defineProperty(Vector.prototype, 'isVector', { value: true } );



/**
 * Scale this vector.
 * @param  {Number} scale Scaling factor.
 * @return {Vector} new vector
 */
Vector.prototype.scale = function(scale) {
  var a = new Array(this.size);

  for (var i = 0; i<this.size; ++i) {
    a[i] = this.data[i] * scale;
  }

  return new Vector(a);
};



/**
 * Scale this vector in-place.
 * @param  {Number} scale Scaling factor.
 * @return this
 */
Vector.prototype.scaleP = function(scale) {
  for (var i = 0; i<this.size; ++i) {
    this.data[i] *= scale;
  }
  return this;
};






// ------------------------------
// Matrices
// ------------------------------



/** 
 * Construct a matrix.
 *
 * @param {Arrya} data Array of arrays representing matrix.
 * 
 * @constructor
 */
var Matrix = LinAlg.Matrix = function(data) {
  this.data = data;
  this.rows = data.length;
  this.cols = data[0].length;
  this.size = [this.rows, this.cols];
};



/**
 * Is this a matrix?
 */
Object.defineProperty(Matrix.prototype, 'isMatrix', { value: true });



/**
 * Scale this matrix
 * @param  {Number} scale Scaling factor.
 * @return {Matrix} new matrix.
 */
Matrix.prototype.scale = function(scale) {
  var a = new Array(this.rows);

  for (var i = 0; i<this.rows; ++i) {
    a[i] = new Array(this.cols);

    for (var j = 0; j<this.cols; ++j) {
      a[i][j] = this.data[i][j] * scale;
    }
  }

  return new Matrix(a);
};




/**
 * Scale this matrix
 * @param  {Number} scale Scaling factor.
 * @return {Matrix} new matrix.
 */
Matrix.prototype.scale = function(scale) {
  var a = new Array(this.rows);

  for (var i = 0; i<this.rows; ++i) {
    a[i] = new Array(this.cols);

    for (var j = 0; j<this.cols; ++j) {
      a[i][j] = this.data[i][j] * scale;
    }
  }

  return new Matrix(a);
};



/**
 * Scale this matrix in-place
 * @param  {Number} scale Scaling factor.
 * @return this
 */
Matrix.prototype.scaleP = function(scale) {
  for (var i = 0; i<this.rows; ++i) {
    for (var j = 0; j<this.cols; ++j) {
      this.data[i][j] *= scale;
    }
  }

  return this;
};





/**
 * Get transpose of this matrix.
 * @return {Matrix}
 */
Matrix.prototype.transpose = function() {
  var result = new Array(this.cols),
    i, j;

  for (j=0; j<this.cols; ++j) {
    result[j] = new Array(this.rows);

    for (i=0; i<this.rows; ++i) {
      result[j][i] = this.data[i][j];
    }
  }

  return new Matrix(result);
}




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
 * @fileOverview  Additional vector operations for high precision version
 */



/**
 * Compute dot product of this vector with another one.
 * @param  {Vector} vector.
 * @return {Number}
 */
Vector.prototype.dot = function(vector) {
  if (this.size !== vector.size) {
    _throwError('Vector dot product requires vectors to have same size');
  }

  var a = new Array(this.size);

  for (var i=0; i<this.size; ++i) {
    a[i] = this.data[i] * vector.data[i];
  }

  return adder(a);
};



/**
 * Subtract another vector from this one.
 * @param  {Vector} vector.
 * @return {Vector} new vector
 */
Vector.prototype.minus = function(vector) {
  if (this.size !== vector.size) {
    _throwError('Vector subtraction requires vectors to have same size');
  }

  var a = new Array(this.size);

  for (var i=0; i<this.size; ++i) {
    a[i] = adder([this.data[i], -vector.data[i]]);
  }

  return new Vector(a);
};



/**
 * Subtract another vector from this one, in-place.
 * @param  {Vector} vector.
 * @return this
 */
Vector.prototype.minusP = function(vector) {
  if (this.size !== vector.size) {
    _throwError('Vector subtraction requires vectors to have same size');
  }

  for (var i=0; i<this.size; ++i) {
    this.data[i] = adder([this.data[i], -vector.data[i]]);
  }        

  return this;
};





/**
 * Add another vector to this one.
 * @param  {Vector} vector.
 * @return {Vector} new vector
 */
Vector.prototype.plus = function(vector) {
  if (this.size !== vector.size) {
    _throwError('Vector addition requires vectors to have same size');
  }

  var a = new Array(this.size);

  for (var i=0; i<this.size; ++i) {
    a[i] = adder([ this.data[i], vector.data[i] ]);
  }

  return new Vector(a);
};




/**
 * Add another vector to this one, in-place.
 * @param  {Vector} vector.
 * @return this
 */
Vector.prototype.plusP = function(vector) {
  if (this.size !== vector.size) {
    _throwError('Vector addition requires vectors to have same size');
  }

  for (var i=0; i<this.size; ++i) {
    this.data[i] = adder([ this.data[i], vector.data[i] ]);
  }

  return this;
};




/**
 * Get the sum of this vector's components.
 * @return Number
 */
Vector.prototype.sum = function() {
  return adder(this.data);
};


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
  if (this.cols !== vector.size) {
    _throwError('Vector dot product requires this.columns = vector.size');
  }

  var a = new Array(this.cols);

  for (var j=0; j<this.cols; ++j) {
    a[j] = this.data[rowNum][j] * vector.data[j];
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
    if (this.cols !== arg.rows) {
      _throwError('Multiplying by matrix requires this.columns = matrix.rows');
    }

    result = new Array(this.rows);
    tmp = new Array(this.cols);

    for (i=0; i<this.rows; ++i) {
      result[i] = new Array(arg.cols);

      for (k=0; k<arg.cols; ++k) {

        for (j=0; j<this.cols; ++j) {
          tmp[j] = this.data[i][j] * arg.data[j][k];
        }

        result[i][k] = adder(tmp);
      }
    }

    return new Matrix(result);
  }
  // vector
  else if (arg.isVector) {
    if (this.cols !== arg.size) {
      _throwError('Multiplying by vector requires this.columns = vector.size');
    }

    result = new Array(this.rows);
    tmp = new Array(arg.size);

    for (i=0; i<this.rows; ++i) {

      for (j=0; j<this.cols; ++j) {
        // store values to add in temporary array
        tmp[j] = this.data[i][j] * arg.data[j];
      }
      // add up the values
      result[i] = adder(tmp);
    }

    return new Vector(result);
  }
};



    return LinAlg;
  };
});

