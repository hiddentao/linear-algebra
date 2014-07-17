/**
 * @fileOverview  Basic objects and operations
 */



var LinAlg = {};


// ------------------------------
// NumArray - base class for vectors and matrices
// ------------------------------


/** 
 * Construct a vector.
 *
 * @param {Array} data Array of values representing vector.
 * 
 * @constructor
 */
var NumArray = function(data) {
  this._data = data;
};



/**
 * Size.
 */
NumArray.prototype.size = function() {
  return this._dim;
};


/**
 * Raw data.
 */
NumArray.prototype.data = function() {
  return this._data;
};






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
  NumArray.call(this, data);
  this._dim = data.length;
};
_inherits(Vector, NumArray);


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
  var a = new Array(this._dim);

  for (var i = 0; i<this._dim; ++i) {
    a[i] = this._data[i] * scale;
  }

  return new Vector(a);
};



/**
 * Scale this vector in-place.
 * @param  {Number} scale Scaling factor.
 * @return this
 */
Vector.prototype.scaleP = function(scale) {
  for (var i = 0; i<this._dim; ++i) {
    this._data[i] *= scale;
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
  NumArray.call(this, data);
  this._rows = data.length;
  this._cols = data[0].length;
  this._dim = [this._rows, this._cols];
};
_inherits(Matrix, NumArray);



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
  var a = new Array(this._rows);

  for (var i = 0; i<this._rows; ++i) {
    a[i] = new Array(this._cols);

    for (var j = 0; j<this._cols; ++j) {
      a[i][j] = this._data[i][j] * scale;
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
  var a = new Array(this._rows);

  for (var i = 0; i<this._rows; ++i) {
    a[i] = new Array(this._cols);

    for (var j = 0; j<this._cols; ++j) {
      a[i][j] = this._data[i][j] * scale;
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
  for (var i = 0; i<this._rows; ++i) {
    for (var j = 0; j<this._cols; ++j) {
      this._data[i][j] *= scale;
    }
  }

  return this;
};





/**
 * Get transpose of this matrix.
 * @return {Matrix}
 */
Matrix.prototype.transpose = function() {
  var result = new Array(this._cols),
    i, j;

  for (j=0; j<this._cols; ++j) {
    result[j] = new Array(this._rows);

    for (i=0; i<this._rows; ++i) {
      result[j][i] = this._data[i][j];
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

