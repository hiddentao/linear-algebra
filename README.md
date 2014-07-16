# linear-algebra

[![Build Status](https://secure.travis-ci.org/hiddentao/linear-algebra.png)](http://travis-ci.org/hiddentao/linear-algebra)

Efficient, high-performance linear algebra library for node.js and browsers.

This is a low-level algebra library which supports basic vector and matrix operations. It is designed with both precision and performance in mind.

Features:

* Provides `Vector` and `Matrix` objects.
* Uses arrays internally for high performance.
* Enhanced floating point [summation accuracy](#increased-precision)
* Comprehensive test coverage.
* Performance benchmarks.
* Works in node.js and in browsers.
* Has no other dependencies.
* Small: <1 KB minified and gzipped.

## Installation

### node.js

Install using [npm](http://npmjs.org/):

    $ npm install linear-algebra

### Browser

Use [bower](https://github.com/bower/bower):

    $ bower install linear-algebra

In the browser the library is exposed via the `linearAlgebra()` function.

## How to use

The examples below assume you are running in node.js. The library needs to be initialised once loaded:

```javascript
var linearAlgebra = require('linearAlgebra')(),     // initialise it
    Vector = linearAlgebra.Vector,
    Matrix = linearAlgebra.Matrix;
```

### Vectors

```javascript
var v = new Vector( [1, 2, 3] );

console.log( v.isVector );   // true
console.log( v.size() );     // 3
console.log( v.data() );     // [1, 2, 3]

// Scaling
var vScaled = v.scale(2);
console.log(vScaled.data());     // [2, 4, 6]
console.log(vScaled === v);     // true - the Vector is scaled in-place

// Dot-product
var v1 = new Vector( [1, 2, 3]);
var v2 = new Vector( [0.1, -2, 4] );
var v3 = v1.dot(v2);
console.log(v3.data());     // [0.1, -4, 12]
console.log(v3 === v1 || v3 === v2);     // false - v3 is a new Vector
```

### Matrices

```javascript
var m = new Matrix( [ [1, 2, 3], [4, 5, 6] ] );

console.log( m.isMatrix );   // true
console.log( m.size() );     // [2, 3]
console.log( m.data() );     // [ [1, 2, 3], [4, 5, 6] ]

// Scaling
var mScaled = m.scale(2);
console.log(mScaled.data());     // [ [2, 4, 6], [8, 10, 12] ]
console.log(mScaled === m);     // true - the Matrix is scaled in-place

// Multiplication with a vector
var m1 = new Matrix( [ [1, 2, 3], [4, 5, 6] ] );
var v1 = new Vector( [1, 2, 3] );
var m2 = m1.mul(v1);
console.log(m2.data());     // [13, 32]
console.log(m2 === m1);     // false - m2 is a new Matrix

// Multiplication with a matrix
m1 = new Matrix( [ [1, 2, 3], [4, 5, 6] ] );
m2 = new Matrix( [ [1, 2], [4, 5], [-3, -6] ] );
var m3 = m1.mul(m2);
console.log(m3.data());     // [ [0, -6], [2, -3] ]
console.log(m3 === m1 || m3 === m2);     // false - m3 is a new Matrix
```

### Increased precision

When adding floating point numbers together the end result is sometimes off by a minor decimal point (to see this try `0.1 + 0.2` in your JS console). 

This module allows you to supply a custom adder function as a parameter to the `linAlg()` call. So if you like you can use the [`add`](https://www.npmjs.org/package/add) module by doing:

```javascript
var add = require('add');

// we pass the 'add' function in as a parameter...
var linearAlgebra = require('linear-algebra')(add);

var Vector = linearAlgebra.Vector,
    Matrix = linearAlgebra.Matrix;
```

## Building

To build the code and run the tests:

    $ npm install -g gulp
    $ npm install
    $ gulp


## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](https://github.com/hiddentao/linear-algebra/blob/master/CONTRIBUTING.md).

## License

MIT - see [LICENSE.md](https://github.com/hiddentao/linear-algebra/blob/master/LICENSE.md)