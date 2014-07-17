/**
 * @fileOverview  Initialization options for high-precision version
 */


// function to add floating point values
var adder = options.add;

if (!adder) {
  _throwError('options.add must be set for precision calculation');
}
