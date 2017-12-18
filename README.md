# linear-algebra

[![Build Status](https://secure.travis-ci.org/hiddentao/linear-algebra.png)](http://travis-ci.org/hiddentao/linear-algebra)

**NOTE: If you're serious about doing machine learning in the browser I recommend using [deeplearn.js](https://deeplearnjs.org/)**

Efficient, high-performance linear algebra library for node.js and browsers.

This is a low-level algebra library which supports basic vector and matrix operations, and has been designed with machine learning algorithms in mind.

Features:

* Simple, expressive, chainable API.
* Array implementation with [performance optimizations](#performance).
* Enhanced [floating point precision](#higher-precision) if needed.
* Comprehensive unit tests.
* Works in node.js and browsers.
* Small: ~1 KB minified and gzipped.

## Installation

### CommonJS

Install using [npm](http://npmjs.org/):

    $ npm install linear-algebra

### Browser

Include `dist/linear-algebra.js` script into your HTML.

In the browser the library is exposed via the `linearAlgebra()` function.

## How to use

Since linear algebra calculations tend to be CPU-intensive it is highly recommended that you run them within a separate thread or process. For browsers this means using a [web worker](https://en.wikipedia.org/wiki/Web_worker). For node.js there are plenty of [similar solutions](https://www.npmjs.org/search?q=webworker) available.

### Initialisation

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
var m2 = m.mulEach(5);   // multiply every element by 5
m2 === m;  // false

// in-place
var m2 = m.mulEach_(5); // notice the _ suffix
m2 === m;  // true
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

// zeros
m = Matrix.zero(3, 2);
console.log( m.data );     // [ [0, 0], [0, 0], [0, 0] ]

// reshape from array
m = Matrix.reshapeFrom([1, 2, 3, 4, 5, 6], 2, 3);
console.log( m.data );     // [ [1, 2, 3,], [4, 5, 6] ]

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
m3 = m.mul(m2);
console.log(m3.data);    // [ [10, 40], [90, 160], [250, 360] ]

// divide corresponding elements
m = new Matrix([ [10, 20], [30, 40], [50, 60] ]);
m2 = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m3 = m.div(m2);
console.log(m3.data);    // [ [10, 10], [10, 10], [10, 10] ]

// add corresponding elements
m = new Matrix([ [10, 20], [30, 40], [50, 60] ]);
m2 = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m3 = m.plus(m2);
console.log(m3.data);    // [ [11, 22], [33, 44], [55, 66] ]

// subtract corresponding elements
m = new Matrix([ [10, 20], [30, 40], [50, 60] ]);
m2 = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m3 = m.minus(m2);
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

// add value to each element
m = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m2 = m.plusEach(5);
console.log(m2.data);    // [ [6, 7], [8, 9], [10, 11] ]

// multiply each element by value
m = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m2 = m.mulEach(5);
console.log(m2.data);    // [ [5, 10], [15, 20], [25, 30] ]

// any function
m = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m2 = m.map(function(v) {
    return v - 1;    
});
console.log(m2.data);    // [ [0, 1], [2, 3], [4, 5] ]

// any function with row and column passed-in
m = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m2 = m.eleMap(function(v, row, col) {
    return (0 === row && 1 === col ? v : v * 2 + 1);    
});
console.log(m2.data);    // [ [1, 1], [7, 9], [11, 13] ]


/* Calculations */

// sum all elements
m = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
console.log(m.getSum());    // 21


/* Other methods */

// cloning
m = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m2 = m.clone();
console.log( m2.data ); // [ [1, 2], [3, 4], [5, 6] ]

// to plain array
m = new Matrix([ [1, 2], [3, 4], [5, 6] ]);
m2 = m.toArray();
console.log( m2 ); // [ [1, 2], [3, 4], [5, 6] ]
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

Performance vs. similar modules:

```bash
[17:23:14] Running suite vs. other modules [/Users/home/dev/js/linear-algebra/benchmark/vs-other-modules.perf.js]...
[17:23:20]    Matrix dot-product (100x100) - linear-algebra x 288 ops/sec ±1.21% (88 runs sampled)
[17:23:25]    Matrix dot-product (100x100) - sylvester x 56.77 ops/sec ±4.51% (61 runs sampled)
[17:23:25] Fastest test is Matrix dot-product (100x100) - linear-algebra at 5.1x faster than Matrix dot-product (100x100) - sylvester
```

To run the performance benchmarks:

```bash
$ npm install -g gulp
$ npm install
$ gulp benchmark
```

Matrix operations which result in a new matrix are implemented as two methods - a default method which returns a new `Matrix` instance and an _in-place_ method which causes the original to be overwritten.

The _in-place_ versions are provided because - general speaking- memory allocations and garbage collection are expensive operations you don't want happening when you're performing lots of calculations. Overwriting an existing array is [twice as fast](http://jsperf.com/create-new-array-vs-overwrite-existing) as creating a new one. And since changing the size of an array is also an expensive operation, even if a matrix operation results in a smaller matrix than before the internal array is kept at the same size:

```js
var m = new Matrix([ [1, 2, 3], [4, 5, 6] ]);
var m2 = new Matrix([ [7], [8], [9] ]);

m.dot_(m2);

console.log( m.data );  // [ [43, 2, 3], [112, 5, 6] ]
console.log( m.rows );  // 2
console.log( m.cols );  // 1
```

The _in-place_ versions attempt to limit memory allocations as much as possible and therefore ought to be faster. However, this may not be true for all the matrix operations contained in this library.

If you're dealing with large matrices (>100 rows, columns) then you're more likely to see a benefit from using the _in-place_ versions of methods:

```bash
[14:38:35] Running suite Default (new object) vs in-place modification [/Users/home/dev/js/linear-algebra/benchmark/default-vs-in-place.perf.js]...
[14:38:41]    Matrix dot-product (5x5) - default x 1,114,666 ops/sec ±0.94% (96 runs sampled)
[14:38:46]    Matrix dot-product (5x5) - in-place x 721,296 ops/sec ±2.95% (94 runs sampled)
[14:38:52]    Matrix dot-product (100x100) - default x 269 ops/sec ±3.75% (88 runs sampled)
[14:38:57]    Matrix dot-product (100x100) - in-place x 283 ops/sec ±0.94% (93 runs sampled)
[14:39:09]    Matrix dot-product (500x500) - default x 1.40 ops/sec ±9.96% (8 runs sampled)
[14:39:20]    Matrix dot-product (500x500) - in-place x 1.45 ops/sec ±4.30% (8 runs sampled)
[14:39:26]    Matrix transpose (1000x5) - default x 13,770 ops/sec ±3.00% (91 runs sampled)
[14:39:31]    Matrix transpose (1000x5) - in-place x 9,736 ops/sec ±2.44% (87 runs sampled)
[14:39:37]    Multiple matrix operations - default x 218 ops/sec ±2.57% (88 runs sampled)
[14:39:42]    Multiple matrix operations - in-place x 222 ops/sec ±0.71% (89 runs sampled)
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
