/**
 * @fileOverview  Additional vector operations
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

  var a = 0;

  for (var i=0; i<this.size; ++i) {
    a += this.data[i] * vector.data[i];
  }

  return a;
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
    a[i] = this.data[i] - vector.data[i];
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
    this.data[i] = this.data[i] - vector.data[i];
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
    a[i] = this.data[i] + vector.data[i];
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
    this.data[i] = this.data[i] + vector.data[i];
  }

  return this;
};



/**
 * Get the sum of this vector's components.
 * @return Number
 */
Vector.prototype.sum = function() {
  var sum = 0;

  for (var i=0; i<this.size; ++i) {
    sum += this.data[i];
  }

  return sum;
};



