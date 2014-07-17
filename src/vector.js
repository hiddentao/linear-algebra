/**
 * @fileOverview  Additional vector operations
 */



/**
 * Compute dot product of this vector with another one.
 * @param  {Vector} vector.
 * @return {Number}
 */
Vector.prototype.dot = function(vector) {
  if (this._dim !== vector._dim) {
    _throwError('Vector dot product requires vectors to have same size');
  }

  var a = 0;

  for (var i=0; i<this._dim; ++i) {
    a += this._data[i] * vector._data[i];
  }

  return a;
};



/**
 * Subtract another vector from this one.
 * @param  {Vector} vector.
 * @return {Vector} new vector
 */
Vector.prototype.minus = function(vector) {
  if (this._dim !== vector._dim) {
    _throwError('Vector subtraction requires vectors to have same size');
  }

  var a = new Array(this._dim);

  for (var i=0; i<this._dim; ++i) {
    a[i] = this._data[i] - vector._data[i];
  }

  return new Vector(a);
};



/**
 * Subtract another vector from this one, in-place.
 * @param  {Vector} vector.
 * @return this
 */
Vector.prototype.minusP = function(vector) {
  if (this._dim !== vector._dim) {
    _throwError('Vector subtraction requires vectors to have same size');
  }

  for (var i=0; i<this._dim; ++i) {
    this._data[i] = this._data[i] - vector._data[i];
  }        

  return this;
};





/**
 * Add another vector to this one.
 * @param  {Vector} vector.
 * @return {Vector} new vector
 */
Vector.prototype.plus = function(vector) {
  if (this._dim !== vector._dim) {
    _throwError('Vector addition requires vectors to have same size');
  }

  var a = new Array(this._dim);

  for (var i=0; i<this._dim; ++i) {
    a[i] = this._data[i] + vector._data[i];
  }

  return new Vector(a);
};




/**
 * Add another vector to this one, in-place.
 * @param  {Vector} vector.
 * @return this
 */
Vector.prototype.plusP = function(vector) {
  if (this._dim !== vector._dim) {
    _throwError('Vector addition requires vectors to have same size');
  }

  for (var i=0; i<this._dim; ++i) {
    this._data[i] = this._data[i] + vector._data[i];
  }

  return this;
};
