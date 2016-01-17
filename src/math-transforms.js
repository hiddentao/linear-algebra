/**
 * Apply function to all elements in this matrix.
 *
 * @param {Function} transformFn With signature (double) => double
 */
BUILD(MATH_OP, map, transformFn(thisData[row][col]), transformFn)


/**
 * Calculate the natural log (ln) all the elements.
 */
BUILD(MATH_OP, log, Math.log(thisData[row][col]))


/**
 * Calculate the sigmoid function of all the elements.
 *
 * See http://en.wikipedia.org/wiki/Sigmoid_function
 */
BUILD(MATH_OP, sigmoid, (1 / (1 + Math.exp(-thisData[row][col]))))

var n2n = function(value) {
  if (isNaN(value)) {
    return 0;
  } else if (value === Number.POSITIVE_INFINITY) {
    return Number.MAX_VALUE;
  } else if (value === Number.NEGATIVE_INFINITY) {
    return -Number.MAX_VALUE;
  } else {
    return value;
  }
}

/**
 * Calculate the nanToNum function of all the elements.
 */
BUILD(MATH_OP, nanToNum, n2n(thisData[row][col]))


/**
 * Multiply every element with given value.
 * @param  {Number} value Value to multiple with.
 */
BUILD(MATH_OP, mulEach, thisData[row][col] * value, value)


/**
 * Add a value to every element.
 * @param  {Number} value Value to multiple with.
 */
BUILD(MATH_OP, plusEach, thisData[row][col] + value, value)

/**
 * Apply function with row and column parameters to all elements in matrix
 *
 * Used to apply different transformations depending on placement in matrix.
 */
BUILD(ELE_MATH_OP, eleMap, transformFn(thisData[row][col], row, col), transformFn)
