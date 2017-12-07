export class Matrix {
  constructor (array, rows, cols) {
    // array must be valid
    if (!array || !Array.isArray(array)) {
      throw new Error('Array must be valid')
    }

    // try and work out no. of rows and columns
    if (rows === undefined && cols === undefined) {
      if (!Array.isArray(array[0])) {
        throw new Error('Array must be 2D if rows and cols omitted');
      }

      rows = array.length
      cols = array[0].length
      // flatten array
      array = array.reduce((m, v) => m.concat(v), [])
    }

    if (1 > rows) {
      throw new Error("Rows must be >= 1")
    }

    if (1 > cols) {
      throw new Error("Columns must be >= 1")
    }

    if (array.length !== rows * cols) {
      throw new Error("Array length doesn't match rows * cols")
    }

    this._array = array
    this._rows = rows
    this._cols = cols

    // instanceof is expensive so we use this flag instead
    this.isMatrix = true
  }

  static zero(rows, cols) {
    return new Matrix(new Array(rows * cols).fill(0), rows, cols);
  }

  static rand(rows, cols) {
    const len = rows * cols;

    const a = new Array(len);
    for (let i = 0; len > i; ++i) {
      a[i] = Math.random();
    }

    return new Matrix(a, rows, cols);
  }

  static from(matrix) {
    return new Matrix(matrix._array.concat([]), matrix._rows, matrix._cols)
  }

  reshape (rows, cols) {
    if (rows * cols !== this._array.length) {
      throw new Error(`Unable to reshape from ${this._rows} x ${this._cols} to ${rows} x ${cols}`)
    }

    this._rows = rows
    this._cols = cols

    return this
  }

  toArray () {
    return [].concat(this._array)
  }
}

// Basic element-wise maths
[
  ['plus', '+'],
  ['minus', '-'],
  ['times', '*'],
  ['divideBy', '/']
].forEach(([ methodName, operator ]) => {
  Matrix.prototype[methodName] = Function('val', `
    if (val && val.isMatrix) {
      if (val._rows !== this._rows) {
        throw new Error(\`Broadcast matrix has \${val._rows} rows instead of \${this._rows}\`)
      }

      if (1 === val._cols) {
        for (let i = 0; i < this._array.length; ++i) {
          this._array[i] ${operator}= val._array[i % this._rows]
        }
      } else {
        if (val._cols !== this._cols) {
          throw new Error(\`Broadcast matrix has \${val._cols} columns instead of 1 or \${this._cols}\`)
        }

        for (let i = 0; i < this._array.length; ++i) {
          this._array[i] ${operator}= val._array[i]
        }
      }
    } else {
      for (let i = 0; i < this._array.length; ++i) {
        this._array[i] ${operator}= val
      }
    }

    return this
  `)
})
