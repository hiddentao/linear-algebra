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



