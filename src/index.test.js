import { Matrix } from './'

describe('Matrix', () => {
  describe('basic maths', () => {
    describe('plus()', () => {
      it('can broadcast a number', () => {
        const m = new Matrix([ 1, 2, 3, 4, 5, 6 ], 2, 3)

        m.plus(5)

        expect(m.toArray()).toEqual([ 6, 7, 8, 9, 10, 11 ])
      })

      it('can broadcast an equally sized matrix', () => {
        const m = new Matrix([ 1, 2, 3, 4, 5, 6 ], 2, 3)
        const m2 = new Matrix([ 7, 9, 1, 0, 2, 3 ], 2, 3)

        m.plus(m2)

        expect(m.toArray()).toEqual([ 8, 11, 4, 4, 7, 9 ])
      })

      it('can broadcast a single column matrix', () => {
        const m = new Matrix([ 1, 2, 3, 4, 5, 6 ], 2, 3)
        const m2 = new Matrix([ 7, 9 ], 2, 1)

        m.plus(m2)

        expect(m.toArray()).toEqual([ 8, 9, 10, 13, 14, 15 ])
      })
    })
  })
})
