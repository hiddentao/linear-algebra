/**
 * Get the maximum value of all the elements.
 *
 * @param {Integer} axis
 */
BUILD(SUMMARY_OP, getMax, thisData[i][j] > val, val, axis)

/**
 * Get the mininum value of all the elements.
 *
 * @param {Integer} axis
 */
BUILD(SUMMARY_OP, getMin, thisData[i][j] < val, val, axis)

/**
 * Get the argument of maximum value of all the elements.
 *
 * @param {Integer} axis
 */
BUILD(SUMMARY_OP, getArgMax, thisData[i][j] > val, idx, axis)

/**
 * Get the argument of minimum value of all the elements.
 *
 * @param {Integer} axis
 */
BUILD(SUMMARY_OP, getArgMin, thisData[i][j] < val, idx, axis)