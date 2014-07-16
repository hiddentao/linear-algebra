"use strict";


var sinon = require('sinon');

var chai = require('chai'),
  expect = chai.expect,
  should = chai.should();

chai.use(require('sinon-chai'));


var linAlg = require('./linear-algebra.min');


var mocker = null;

var test = module.exports = {
  beforeEach: function() {
    mocker = sinon.sandbox.create();
  },
  afterEach: function() {
    mocker.restore();
  }
};



test['Vector'] = {
  beforeEach: function() {
    this.Vector = linAlg().Vector;
  },
  'need data': function() {
    expect(function() { 
      new Vector();
    }).to.throw(Error);
  },
  'isVector': function() {
    new this.Vector([]).isVector.should.be.true;
  },
  'dimensions': function() {
    new this.Vector([]).size().should.eql(0);
    new this.Vector([1]).size().should.eql(1);
    new this.Vector([1,2]).size().should.eql(2);
  },
  'data': function() {
    var a = [];
    new this.Vector(a).data().should.eql(a);

    var b = [1,2];
    new this.Vector(b).data().should.eql(b);
  },
  'scale': function() {
    var v = new this.Vector([1,2,3]);
    v.scale(2).scale(3);
    v.data().should.eql([6, 12, 18]);
  },
  'dot product': {
    'different size': function() {
      var v1 = new this.Vector([1,2]),
        v2 = new this.Vector([4]);

      expect(function() {
        v1.dot(v2);
      }).to.throw('Vector dot product requires vectors to have same size');
    },
    'same size': function() {
      var v1 = new this.Vector([1.1, 2]),
        v2 = new this.Vector([4, 0.2]),
        v1dot2 = v1.dot(v2),
        v2dot1 = v2.dot(v1);

      v1dot2.should.be.instanceOf(this.Vector);
      v2dot1.should.be.instanceOf(this.Vector);

      v1dot2.data().should.eql(v2dot1.data());

      v1dot2.data().should.eql([4.4, 0.4]);
    }
  },
};




test['Matrix'] = {
  beforeEach: function() {
    var LinAlg = linAlg();
    this.Vector = LinAlg.Vector;
    this.Matrix = LinAlg.Matrix;
  },
  'need data': function() {
    expect(function() { 
      new Matrix();
    }).to.throw(Error);
  },
  'isMatrix': function() {
    new this.Matrix([[]]).isMatrix.should.be.true;
  },
  'dimensions': function() {
    expect(function() {
      new this.Matrix([]);
    }).to.throw(Error);

    var a = [[]];
    new this.Matrix(a).size().should.eql([1,0]);

    a = [ [1,2], [3,4], [5,6] ];
    new this.Matrix(a).size().should.eql([3,2]);
  },
  'data': function() {
    var a = [ [1,2], [3,4], [5,6] ];
    new this.Matrix(a).data().should.eql(a);
  },
  'scale': function() {
    var a = [ [1,2], [3,4], [5,6] ];
    var m = new this.Matrix(a);
    m.scale(2).scale(3);
    m.data().should.eql([ [6,12], [18,24], [30,36] ]);
  },
  'transpose': function() {
    var a = [ [1,2], [3,4], [5,6] ];
    var m = new this.Matrix(a);

    var res = m.transpose();

    res.should.be.instanceOf(this.Matrix);
    res.data().should.eql([ [1, 3, 5], [2, 4, 6] ]);
  },
  'mul': {
    beforeEach: function() {
      var a = [ [1,2], [3,4], [5,6] ];
      this.m = new this.Matrix(a);
    },
    'with vector': {
      'wrong size': function() {
        var self = this;

        var v = new this.Vector([1, 0.5, -1]);

        expect(function() {
          self.m.mul(v);
        }).to.throw('Multiplying by vector requires this.columns = vector.size');
      },
      'right size': function() {
        var v = new this.Vector([1, 0.5]);

        var res = this.m.mul(v);

        res.should.be.instanceOf(this.Vector);

        res.data().should.eql([ 2, 5, 8 ]);
      }
    },
    'with matrix': {
      'wrong size': function() {
        var self = this;

        var m2 = new this.Matrix([ [5,7], [0.5,-4], [-9,2] ]);

        expect(function() {
          self.m.mul(m2);
        }).to.throw('Multiplying by matrix requires this.columns = matrix.rows');
      },
      'right size': function() {
        var m2 = new this.Matrix([ [5, 7, 0.5, 8], [0.5, -4, 9, -1] ]);

        var res = this.m.mul(m2);

        res.should.be.instanceOf(this.Matrix);

        res.data().should.eql([ [6, -1, 18.5, 6], [17, 5, 37.5, 20], [28, 11, 56.5, 34] ]);
      }
    }
  },
  'scalar': function() {
    var m1 = this.Matrix.scalar(3, 1.2);

    m1.should.be.instanceOf(this.Matrix);
    m1.data().should.eql([ [1.2, 0, 0], [0, 1.2, 0], [0, 0, 1.2] ]);
  },
  'identity': function() {
    var m1 = this.Matrix.identity(3);

    m1.should.be.instanceOf(this.Matrix);
    m1.data().should.eql([ [1, 0, 0], [0, 1, 0], [0, 0, 1] ]);
  }
};




