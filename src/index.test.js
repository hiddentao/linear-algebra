import each from 'jest-each'

import { Matrix, trans, sum } from './'


describe('Matrix', () => {
  describe('accessors', () => {
    it('.rows() returns no. of rows', () => {
      const m = new Matrix([ 1, 2, 3, 4, 5, 6 ], 2, 3)

      expect(m.rows).toEqual(2)
    })

    it('.cols() returns no. of columns', () => {
      const m = new Matrix([ 1, 2, 3, 4, 5, 6 ], 2, 3)

      expect(m.cols).toEqual(3)
    })
  })

  describe('statics', () => {
    it('.fromMatrix() returns a clone of given matrix', () => {
      const m = new Matrix([ 1, 2, 3, 4, 5, 6 ], 2, 3)

      const m2 = Matrix.fromMatrix(m)

      expect(m2._array).not.toBe(m._array)
      expect(m2._array).toEqual(m._array)
      expect(m2._rows).toEqual(m._rows)
      expect(m2._cols).toEqual(m._cols)
    })

    it('.zeros() returns a 0 matrix', () => {
      const m = Matrix.zero(2, 3)

      expect(m._array).toEqual([ 0, 0, 0, 0, 0, 0 ])
      expect(m._rows).toEqual(2)
      expect(m._cols).toEqual(3)
    })

    it('.rand() returns a matrix with random values', () => {
      expect.assertions(9)

      const m = Matrix.zero(2, 3)

      expect(m._array.length).toEqual(6)
      expect(m._rows).toEqual(2)
      expect(m._cols).toEqual(3)

      for (let val of m._array) {
        expect(0 <= val && 1 >= val).toBeTruthy()
      }
    })
  })

  describe('.fn()', () => {
    it('returns itself', () => {
      const m = new Matrix([ 1, 2, 3, 4, 5, 6 ], 2, 3)
      const fn = jest.fn()

      expect(m.fn(fn)).toBe(m)
    })

    it('maps a given function to every element', () => {
      const m = new Matrix([ 1, 2, 3, 4, 5, 6 ], 2, 3)
      const fn = jest.fn()

      m.fn(fn)

      expect(fn).toHaveBeenCalledTimes(6)
      expect(fn).toHaveBeenCalledWith(1, 0, 0)
      expect(fn).toHaveBeenCalledWith(2, 1, 0)
      expect(fn).toHaveBeenCalledWith(3, 0, 1)
      expect(fn).toHaveBeenCalledWith(4, 1, 1)
      expect(fn).toHaveBeenCalledWith(5, 0, 2)
      expect(fn).toHaveBeenCalledWith(6, 1, 2)
    })

    it('assigns function return value to every element', () => {
      const m = new Matrix([ 1, 2, 3, 4, 5, 6 ], 2, 3)
      const fn = jest.fn(val => val * 2.5)

      m.fn(fn)

      expect(m._array).toEqual([ 2.5, 5, 7.5, 10, 12.5, 15 ])
    })
  })

  describe('basic maths', () => {
    each([
      ['plus', [ 6, 7, 8, 9, 10, 11 ], [ 8, 11, 4, 4, 7, 9 ], [ 8, 11, 10, 13, 12, 15 ]],
      ['minus', [ -4, -3, -2, -1, 0, 1 ], [ -6, -7, 2, 4, 3, 3 ], [ -6, -7, -4, -5, -2, -3 ]],
      ['times', [ 5, 10, 15, 20, 25, 30 ], [ 7, 18, 3, 0, 10, 18 ], [ 7, 18, 21, 36, 35, 54 ]],
      ['divideBy', [ 1/5, 2/5, 3/5, 4/5, 1, 6/5 ], [ 1/7, 2/9, 3/1, 4/0, 5/2, 6/3 ], [ 1/7, 2/9, 3/7, 4/9, 5/7, 6/9 ]],
    ])
    .describe('.%s()', (method, rbVal, rbN, rbOne) => {
      it('returns itself', () => {
        const m = new Matrix([ 1, 2, 3, 4, 5, 6 ], 2, 3)

        expect(m[method](1)).toEqual(m)
      })

      it('can broadcast a number', () => {
        const m = new Matrix([ 1, 2, 3, 4, 5, 6 ], 2, 3)

        m[method](5)

        expect(m.toArray()).toEqual(rbVal)
      })

      it('can broadcast an equally sized matrix', () => {
        const m = new Matrix([ 1, 2, 3, 4, 5, 6 ], 2, 3)
        const m2 = new Matrix([ 7, 9, 1, 0, 2, 3 ], 2, 3)

        m[method](m2)

        expect(m.toArray()).toEqual(rbN)
      })

      it('can broadcast a single column matrix', () => {
        const m = new Matrix([ 1, 2, 3, 4, 5, 6 ], 2, 3)
        const m2 = new Matrix([ 7, 9 ], 2, 1)

        m[method](m2)

        expect(m.toArray()).toEqual(rbOne)
      })

      it('throws error if broadcast matrix has different no. of rows', () => {
        const m = new Matrix([ 1, 2, 3, 4, 5, 6 ], 2, 3)
        const m2 = new Matrix([ 7, 9, 2 ], 3, 1)

        try {
          m[method](m2)
        } catch (err) {
          expect(err.message).toContain('Broadcast matrix has 3 rows instead of 2')
        }
      })

      it('throws error if broadcast matrix has neither 1 nor matching no. of columns', () => {
        const m = new Matrix([ 1, 2, 3, 4, 5, 6 ], 2, 3)
        const m2 = new Matrix([ 7, 9, 8, 4 ], 2, 2)

        try {
          m[method](m2)
        } catch (err) {
          expect(err.message).toContain('Broadcast matrix has 2 columns instead of 1 or 3')
        }
      })
    })
  })
})

describe('.trans()', () => {
  it('transposes a matrix', () => {
    const m = new Matrix([ 1, 2, 3, 4, 5, 6 ], 2, 3)

    const m2 = trans(m)

    expect(m2).not.toBe(m)
    expect(m2._array).toEqual([ 1, 3, 5, 2, 4, 6 ])
    expect(m2._rows).toEqual(3)
    expect(m2._cols).toEqual(2)
  })

  it('transposes a column vector', () => {
    const m = new Matrix([ 1, 2, 3, 4, 5, 6 ], 6, 1)

    const m2 = trans(m)

    expect(m2).not.toBe(m)
    expect(m2._array).toEqual([ 1, 2, 3, 4, 5, 6 ])
    expect(m2._rows).toEqual(1)
    expect(m2._cols).toEqual(6)
  })

  it('transposes a row vector', () => {
    const m = new Matrix([ 1, 2, 3, 4, 5, 6 ], 1, 6)

    const m2 = trans(m)

    expect(m2).not.toBe(m)
    expect(m2._array).toEqual([ 1, 2, 3, 4, 5, 6 ])
    expect(m2._rows).toEqual(6)
    expect(m2._cols).toEqual(1)
  })
})
