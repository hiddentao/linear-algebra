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

