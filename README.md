# linear-algebra

[![Build Status](https://secure.travis-ci.org/hiddentao/linear-algebra.png)](http://travis-ci.org/hiddentao/linear-algebra)

Efficient, high-performance linear algebra library for node.js and browsers.

This is a low-level algebra library which supports basic vector and matrix operations, and has been designed with machine learning algorithms in mind.

Features:

* Provides `Vector` and `Matrix` objects.
* Uses arrays internally for high performance.
* Can perform basic arithmetic in-place for more efficiency.
* Enhanced [floating point precision](#increased-precision)
* Comprehensive unit tests.
* Works in node.js and in browsers.
* Has no other dependencies.
* Small: <2 KB minified and gzipped.

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
var linearAlgebra = require('linear-algebra')(),     // initialise it
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
v = new Vector( [1, 2, 3] );
var vScaled = v.scale(2);
console.log(vScaled.data());     // [2, 4, 6]

// Scaling in-place
v = new Vector( [1, 2, 3] );
v.scaleP(2);
console.log(v.data());     // [2, 4, 6]

// Addition
var v1 = new Vector( [1, 2, 3]);
var v2 = new Vector( [0.1, -2, 4] );
var v3 = v1.plus(v2);
console.log( v3.data() );        // [ 1.1, 0, 7 ]

// Addition in-place
var v1 = new Vector( [1, 2, 3]);
var v2 = new Vector( [0.1, -2, 4] );
v1.plusP(v2);
console.log( v1.data() );        // [ 1.1, 0, 7 ]

// Subtraction
var v1 = new Vector( [1, 2, 3]);
var v2 = new Vector( [0.1, -2, 4] );
var v3 = v1.minus(v2);
console.log( v3.data() );        // [ 0.9, 4, -1 ]

// Subtraction in-place
var v1 = new Vector( [1, 2, 3]);
var v2 = new Vector( [0.1, -2, 4] );
v1.minusP(v2);
console.log( v1.data() );        // [ 0.9, 4, -1 ]

// Dot-product
v1 = new Vector( [1, 2, 3]);
v2 = new Vector( [0.1, -2, 4] );
var prod = v1.dot(v2);
console.log(prod);   // 8.1
```

### Matrices

```javascript
var m = new Matrix( [ [1, 2, 3], [4, 5, 6] ] );
console.log( m.isMatrix );   // true
console.log( m.size() );     // [2, 3]
console.log( m.data() );     // [ [1, 2, 3], [4, 5, 6] ]

// Scaling
m = new Matrix( [ [1, 2, 3], [4, 5, 6] ] );
var mScaled = m.scale(2);
console.log(mScaled.data());     // [ [2, 4, 6], [8, 10, 12] ]

// Scaling in-place
m = new Matrix( [ [1, 2, 3], [4, 5, 6] ] );
m.scaleP(2);
console.log(m.data());     // [ [2, 4, 6], [8, 10, 12] ]

// Transpose
var m = new Matrix( [ [1, 2, 3], [4, 5, 6] ] );
var mTranspose = m.transpose();
console.log(mTranspose.data());     // [ [1, 4], [2, 5], [3, 6] ]

// Multiplication with a vector
var m1 = new Matrix( [ [1, 2, 3], [4, 5, 6] ] );
var v1 = new Vector( [1, 2, 3] );
var m2 = m1.mul(v1);
console.log(m2.data());     // [13, 32]

// Multiplication with a matrix
m1 = new Matrix( [ [1, 2, 3], [4, 5, 6] ] );
m2 = new Matrix( [ [1, 2], [4, 5], [-3, -6] ] );
var m3 = m1.mul(m2);
console.log(m3.data());     // [ [0, -6], [2, -3] ]

// Dot-product of a specific row with a vector
var m = new Matrix( [ [1, 2, 3], [4, 5, 6] ] );
var v = new Vector( [ -1, -2, -4] );
var prod = m.dot(1, v); // 1 = second row 
console.log( prod );  // -38
```

The `Matrix` class provides a few static helper methods for creating specific types of matrices:

```javascript
// Create a scalar (diagonal) matrix
var m = Matrix.scalar(3, 5);
console.log(m.size());      // 3
console.log(m.data());      // [ [5, 0, 0], [0, 5, 0], [0, 0, 5] ]

// Create an identity matrix
m = Matrix.identity(3);
console.log(m.size());      // 3
console.log(m.data());      // [ [1, 0, 0], [0, 1, 0], [0, 0, 1] ]
```

### Increased precision

When adding floating point numbers together the end result is sometimes off by a minor decimal point (to see this try `0.1 + 0.2` in your JS console). 

This module allows you to supply a custom adder function as an option to the initialization call. So if you like you can use the [`add`](https://www.npmjs.org/package/add) module by doing:

```javascript
// we pass the 'add' function in as a parameter...
var linearAlgebra = require('linear-algebra')({
    add: require('add')
});

/*
From now on all floating point addition within the library will be 
performed using the `add()` method passed in.
*/

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