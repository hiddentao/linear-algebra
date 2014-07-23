# linear-algebra

[![Build Status](https://secure.travis-ci.org/hiddentao/linear-algebra.png)](http://travis-ci.org/hiddentao/linear-algebra)

Efficient, high-performance linear algebra library for node.js and browsers.

This is a low-level algebra library which supports basic vector and matrix operations, and has been designed with machine learning algorithms in mind.

Features:

* Simple, expressive API.
* Array implementation with [performance optimizations](#performance).
* Enhanced [floating point precision](#higher-precision) if needed.
* Comprehensive unit tests.
* Works in node.js and browsers.
* Small: ~1 KB minified and gzipped.

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

Note that both matrices and vectors are represented by `Matrix` instances. The `Vector` object simply contains helpers to create single-row `Matrix` objects.

### In-place methods

Matrix operations which result in a new matrix are implemented as two methods - a default method which returns a new `Matrix` instance and an _in-place_ method which causes the original to be overwritten. In some cases you may obtain better performance if you switch to the in-place version, and vice versa.

The _in-place_ version of a method is named as the original method but with an additional `_` suffix:

```js
var m = new Matrix([ [1, 2, 3], [4, 5, 6] ]);

// default
var m2 = m.mul(5);   // multiply every element by 5
m2 === m1;  // false

// in-place
var m2 = m.mul_(5); // notice the _ suffix
m2 === m1;  // true
```

Using the in-place version of a method may not always yield a performance improvement. You can run the [performance benchmarks](#performance) to see examples of this.

### API

```javascript
var m, m2, m3;  // variables we'll use below

/* Construction */

m = new Matrix([ [1, 2, 3], [4, 5, 6] ]);
console.log( m.rows );     // 2
console.log( m.cols );     // 3
console.log( m.data );     // [ [1, 2, 3], [4, 5, 6] ]

// identity matrix
m = Matrix.identity(3);
console.log( m.data );     // [ [1,0,0], [0,1,0], [0,0,1] ]

// scalar (diagonal) matrix
m = Matrix.scalar(3, 9);
console.log( m.data );     // [ [9,0,0], [0,9,0], [0,0,9] ]

// vector (a 1-row matrix)
m = Vector.zero(5);
console.log( m.data );     // [ [0, 0, 0, 0, 0] ]


/* Algebra */

// transpose
m = new Matrix([ [1, 2, 3], [4, 5, 6] ]);
m2 = m.trans();
console.log(m2.data);    // [ [1, 4], [2, 5], [3, 6] ]

// dot-product
m = new Matrix([ [1, 2, 3], [4, 5, 6] ]);
m2 = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m3 = m.dot(m2);
console.log(m3.data);    // [ [22, 28], [49, 64] ]

// multiply corresponding elements
m = new Matrix([ [10, 20], [30, 40], [50, 60] ]);
m2 = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m3 = m.mulEach(m2);
console.log(m3.data);    // [ [10, 40], [90, 160], [250, 360] ]

// add corresponding elements
m = new Matrix([ [10, 20], [30, 40], [50, 60] ]);
m2 = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m3 = m.plusEach(m2);
console.log(m3.data);    // [ [11, 22], [33, 44], [55, 66] ]

// subtract corresponding elements
m = new Matrix([ [10, 20], [30, 40], [50, 60] ]);
m2 = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m3 = m.minusEach(m2);
console.log(m3.data);    // [ [9, 18], [27, 36], [45, 54] ]


/* Math functions */

// natural log (Math.log)
m = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m2 = m.log();
console.log(m2.data);    // [ [0.0000, 0.69315], [1.09861, 1.38629], [1.60944   1.79176] ]

// sigmoid
m = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m2 = m.sigmoid();
console.log(m2.data);    // [ [0.73106, 0.88080], [0.95257, 0.98201], [0.99331, 0.99753] ]

// plus value
m = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m2 = m.plus(5);
console.log(m2.data);    // [ [6, 7], [8, 9], [10, 11] ]

// any function
m = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m2 = m.map(function(v) {
    return v - 1;    
});
console.log(m2.data);    // [ [0, 1], [2, 3], [4, 5] ]


/* Calculations */

// sum all elements
m = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
console.log(m.getSum());    // 21


```


### Higher precision

When adding floating point numbers together the end result is sometimes off by a minor decimal point (to see this try `0.1 + 0.2` in your JS console). 

This module allows you to supply a custom adder (e.g. [`add`](https://www.npmjs.org/package/add)) as an option to the initialization call.

In node.js:

```javascript
// we pass the 'add' function in as a parameter...
var linAlg = require('linear-algebra')({
    add: require('add')
}),
    Vector = linAlg.Vector,
    Matrix = linAlg.Matrix;
```

In the browser you will need to load in the higher-precision version of the library to be able to do this:

```html
<script type="text/javascript" src="add.js" />
<script type="text/javascript" src="linear-algebra.precision.js" />
<script type="text/javascript">
var linAlg = linearAlgebra({
    add: add
}),
    Vector = linAlg.Vector,
    Matrix = linAlg.Matrix;
</script>
```

**Note: If you use the higher-precision version of the library with a custom adder then expect performance to drop significantly for some matrix operations.**

## Performance

To run the performance benchmarks:

```bash
$ npm install -g gulp
$ npm install
$ gulp benchmark
```

As mentioned earlier, matrix operations which result in a new matrix are implemented as two methods - a default method which returns a new `Matrix` instance and an _in-place_ method which causes the original to be overwritten. 

The _in-place_ versions are provided because in general, overwriting an existing array is [twice as fast](http://jsperf.com/create-new-array-vs-overwrite-existing) as creating a new one. However, this may not be true for all the matrix operations contained in this library, e.g.:

```bash
 Starting 'benchmark'...
[14:10:34] Running suite Default (new object) vs in-place modification [/Users/home/dev/js/linear-algebra/benchmark/default-vs-in-place.perf.js]...
[14:10:39]    Matrix dot-product - default x 1,063,342 ops/sec ±2.26% (93 runs sampled)
[14:10:45]    Matrix dot-product - in-place x 1,046,791 ops/sec ±3.45% (94 runs sampled)
[14:10:50]    Matrix transpose (rows > cols) - default x 1,073,414 ops/sec ±2.55% (89 runs sampled)
[14:10:56]    Matrix transpose (rows > cols) - in-place x 1,077,232 ops/sec ±2.14% (97 runs sampled)
[14:11:01]    Matrix transpose (cols > rows) - default x 1,109,472 ops/sec ±1.99% (94 runs sampled)
[14:11:07]    Matrix transpose (cols > rows) - in-place x 959,265 ops/sec ±1.13% (97 runs sampled)
```

I recommend that you experiment with different methods to see what works best for you.

## Building

To build the code and run the tests:

    $ npm install -g gulp
    $ npm install
    $ gulp


## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](https://github.com/hiddentao/linear-algebra/blob/master/CONTRIBUTING.md).

## License

MIT - see [LICENSE.md](https://github.com/hiddentao/linear-algebra/blob/master/LICENSE.md)