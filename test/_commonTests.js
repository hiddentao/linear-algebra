var chai = require('chai'),
  expect = chai.expect,
  should = chai.should();
chai.use(require('sinon-chai'));


module.exports = function(linAlg, options) {
  "use strict";

  options = options || {};

  var test = {};

  // Basic
  // 
  test['Matrix'] = {
    'beforeEach': function() {
      this.Matrix = linAlg(options).Matrix;
    },

    'constructor': {
      '2d array': function() {
        var a = [ [1, 2], [3, 4], [5, 6] ];
        var m = new this.Matrix(a);
        m.data.should.eql(a);
        m.rows.should.eql(3);
        m.cols.should.eql(2);
      },
      '1d array': function() {
        var a = [1, 2, 3, 4 ];
        var m = new this.Matrix(a);
        m.data.should.eql([a]);
        m.rows.should.eql(1);
        m.cols.should.eql(4);        
      }
    },

    'toArray': {
      'deep copy': function() {
        var a = [ [1, 2], [3, 4], [5, 6] ];
        var m = new this.Matrix(a);

        var c = m.toArray();
        (c === m.data).should.not.be.true;
        c.should.eql(m.data);
        a[0][1] = 5;
        c[0][1].should.eql(2);
      },
      'only what is valid': function() {
        var a = [ [1, 2, 5], [3, 4, 6], [5, 6, 7] ];
        var m = new this.Matrix(a);

        // artificially limit
        m.cols = 2;
        m.rows = 2; 

        var c = m.toArray();

        c.should.eql([ [1, 2], [3, 4] ]);
      }
    },

    'clone': {
      'deep copy': function() {
        var a = [ [1, 2], [3, 4], [5, 6] ];
        var m = new this.Matrix(a);

        var c = m.clone();
        c.rows.should.eql(3);
        c.cols.should.eql(2);

        (c.data === m.data).should.not.be.true;
        c.data.should.eql(m.data);
        m.data[0][1] = 5;
        c.data[0][1].should.eql(2);        
      },
      'only what is valid': function() {
        var a = [ [1, 2, 5], [3, 4, 6], [5, 6, 7] ];
        var m = new this.Matrix(a);

        // artificially limit
        m.cols = 2;
        m.rows = 2; 

        var c = m.clone();

        c.data.should.eql([ [1, 2], [3, 4] ]);
        c.rows = 2;
        c.cols = 2;
      }
    },

    '.identity': function() {
        var m = this.Matrix.identity(3);
        
        m.should.be.instanceOf(this.Matrix);
        m.data.should.eql([ [1, 0, 0], [0, 1, 0], [0, 0, 1] ]);
    },

    '.scalar': function() {
        var m = this.Matrix.scalar(3, 9);
        
        m.should.be.instanceOf(this.Matrix);
        m.data.should.eql([ [9, 0, 0], [0, 9, 0], [0, 0, 9] ]);
    },
    '.zero': function() {
      var m = this.Matrix.zero(4, 3);

      m.should.be.instanceOf(this.Matrix);
      m.data.should.eql( [ [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0] ]);
    },
    '.reshapeFrom': function() {
        var m = this.Matrix.reshapeFrom([1, 2, 5, 3, 4, 6, 5, 6, 7, 7, 8, 8], 4, 3);

        m.should.be.instanceOf(this.Matrix);
        m.data.should.eql([ [ 1, 2, 5 ], [ 3, 4, 6 ], [ 5, 6, 7 ], [ 7, 8, 8 ] ]);

        var that = this;

        expect(function() {
          that.Matrix.reshapeFrom([1, 2, 3], 2, 2)
        }).throws('linear-algebra: cannot reshape array of length 3 into 2x2 matrix');

    }
  };
    
  // algebra 
    
  test['Matrix']['algebra'] = {
    'transpose': {
      'default': {
        'cols > rows': function() {
          var a = [ [1, 2, 5], [3, 4, 6] ];
          var m = new this.Matrix(a);

          var m2 = m.trans();
          m2.should.be.instanceOf(this.Matrix);
          m2.should.not.eql(m);

          m2.data.should.not.eql(m.data);
          m2.data.should.eql([ [1, 3], [2, 4], [5, 6] ]);
          m2.rows = 3;
          m2.cols = 2;
        },
        'rows > cols': function() {
          var a = [ [1, 2], [3, 4], [5, 6] ];
          var m = new this.Matrix(a);

          var m2 = m.trans();
          m2.should.be.instanceOf(this.Matrix);
          m2.should.not.eql(m);

          m2.data.should.not.eql(m.data);
          m2.data.should.eql([ [1, 3, 5], [2, 4, 6] ]);
          m2.rows = 2;
          m2.cols = 3;
        }
      },
      'in-place': {
        'cols > rows': function() {
          var a = [ [1, 2, 5], [3, 4, 6] ];
          var m = new this.Matrix(a);

          var m2 = m.trans_();
          m2.should.eql(m);

          m2.data.should.eql(m.data);
          m2.data.should.eql([ [1, 3, 5], [2, 4, 6], [5, 6] ]);
          m2.rows = 3;
          m2.cols = 2;
        },
        'rows > cols': function() {
          var a = [ [1, 2], [3, 4], [5, 6] ];
          var m = new this.Matrix(a);

          var m2 = m.trans_();
          m2.should.eql(m);

          m2.data.should.eql(m.data);
          m2.data.should.eql([ [1, 3, 5], [2, 4, 6], [5, 6] ]);
          m2.rows = 2;
          m2.cols = 3;
        }        
      }
    },

    'dot': {
      'default': {
        'size mismatch': function() {
          var m = new this.Matrix([ [1, 2, 5], [3, 4, 6], [5, 6, 7] ]);
          var m2 = new this.Matrix([ [1, 2, 5], [3, 4, 6] ]);
          var m3 = new this.Matrix([ [1, 2, 5] ]);

          expect(function() {
            m.dot(m2)
          }).throws('linear-algebra: [dot] op1 is 3 x 3 and op2 is 2 x 3');

          expect(function() {
            m.dot(m3)
          }).throws('linear-algebra: [dot] op1 is 3 x 3 and op2 is 1 x 3');
        },
        'size match': function() {
          var m = new this.Matrix([ [0.1, 0.2, 0.5], [0.3, 1.4, 1.6] ]);
          var m2 = new this.Matrix([ [0.2], [2.3], [5.5] ]);

          var m3 = m.dot(m2);
          m3.should.be.instanceOf(this.Matrix);
          m3.should.not.eql(m);

          m3.data.should.not.eql(m.data);
          
          var r1, r2;

          if (options.adder) {
            r1 = options.adder([0.1*0.2, 0.2*2.3, 0.5*5.5]);
            r2 = options.adder([0.3*0.2, 1.4*2.3, 1.6*5.5]);
          } else {
            r1 = 0.1*0.2 + 0.2*2.3 + 0.5*5.5
            r2 = 0.3*0.2 + 1.4*2.3 + 1.6*5.5;
          }

          m3.data.should.eql([ [r1], [r2] ]);
          m3.rows = 2;
          m3.cols = 1;
        }
      },
      'in-place': {
        'size mismatch': function() {
          var m = new this.Matrix([ [1, 2, 5], [3, 4, 6], [5, 6, 7] ]);
          var m2 = new this.Matrix([ [1, 2, 5], [3, 4, 6] ]);
          var m3 = new this.Matrix([ [1, 2, 5] ]);

          expect(function() {
            m.dot_(m2)
          }).throws('linear-algebra: [dot_] op1 is 3 x 3 and op2 is 2 x 3');

          expect(function() {
            m.dot_(m3)
          }).throws('linear-algebra: [dot_] op1 is 3 x 3 and op2 is 1 x 3');
        },
        'size match': function() {
          var m = new this.Matrix([ [0.1, 0.2, 0.5], [0.3, 1.4, 1.6] ]);
          var m2 = new this.Matrix([ [0.2], [2.3], [5.5] ]);

          var m3 = m.dot_(m2);
          m3.should.eql(m);

          m3.data.should.eql(m.data);
          
          var r1, r2;

          if (options.adder) {
            r1 = options.adder([0.1*0.2, 0.2*2.3, 0.5*5.5]);
            r2 = options.adder([0.3*0.2, 1.4*2.3, 1.6*5.5]);
          } else {
            r1 = 0.1*0.2 + 0.2*2.3 + 0.5*5.5
            r2 = 0.3*0.2 + 1.4*2.3 + 1.6*5.5;
          }

          m3.data.should.eql([ [r1, 0.2, 0.5], [r2, 1.4, 1.6] ]);
          m3.rows = 2;
          m3.cols = 1;
        }
      }
    }
  };

  var otherBinaryAlgebraOps = {
    div: function(v1, v2) { return v1 / v2 },
    mul: function(v1, v2) { return v1 * v2 },
    plus: function(v1, v2) { return v1 + v2 },
    minus: function(v1, v2) { return v1 - v2 },
  };
  Object.keys(otherBinaryAlgebraOps).forEach(function(fnName) {
    var fnExpCalcFn = otherBinaryAlgebraOps[fnName];

    test['Matrix']['algebra'][fnName] = {
      beforeEach: function() {
        this.buildExpArr = function(m, m2) {
          var ret = [];
          for (var i=0; i<3; ++i) {
            ret[i] = [];

            for (var j=0; j<4; ++j) {
              ret[i][j] = fnExpCalcFn(m.data[i][j], m2.data[i][j]);
            }
          }

          return ret;
        };
      },
      'default': {
        'size mismatch': function() {
          var m = new this.Matrix([ [1, 2, 5], [3, 4, 6], [5, 6, 7] ]);
          var m2 = new this.Matrix([ [1, 2, 5], [3, 4, 6] ]);
          var m3 = new this.Matrix([ [1, 2], [3, 4], [5, 6] ]);

          expect(function() {
            m[fnName](m2)
          }).throws('linear-algebra: [' + fnName + '] op1 is 3 x 3 and op2 is 2 x 3');

          expect(function() {
            m[fnName](m3)
          }).throws('linear-algebra: [' + fnName + '] op1 is 3 x 3 and op2 is 3 x 2');
        },
        'size match': function() {
          var m = new this.Matrix([ [1, 2, 5, 7], [3, 4, 6, 7], [5, 6, 7, 7] ]);
          var m2 = new this.Matrix([ [1, 2, 5, 7], [3, 4, 6, 7], [0.5, 0.6, 0.7, 0.7] ]);

          var m3 = m[fnName](m2);
          m3.should.be.instanceOf(this.Matrix);
          m3.should.not.eql(m);

          m3.data.should.not.eql(m.data);
          m3.data.should.eql(this.buildExpArr(m, m2));
          m3.rows.should.eql(3);
          m3.cols.should.eql(4);
          m3.rows = 3;
          m3.cols = 4;
        }
      },
      'in-place': {
        'size mismatch': function() {
          var m = new this.Matrix([ [1, 2, 5], [3, 4, 6], [5, 6, 7] ]);
          var m2 = new this.Matrix([ [1, 2, 5], [3, 4, 6] ]);
          var m3 = new this.Matrix([ [1, 2], [3, 4], [5, 6] ]);

          expect(function() {
            m[fnName+'_'](m2)
          }).throws('linear-algebra: [' + fnName + '_] op1 is 3 x 3 and op2 is 2 x 3');

          expect(function() {
            m[fnName+'_'](m3)
          }).throws('linear-algebra: [' + fnName + '_] op1 is 3 x 3 and op2 is 3 x 2');
        },
        'size match': function() {
          var m = new this.Matrix([ [1, 2, 5, 7], [3, 4, 6, 7], [5, 6, 7, 7] ]);
          var mCopy = m.clone();
          var m2 = new this.Matrix([ [1, 2, 5, 7], [3, 4, 6, 7], [0.5, 0.6, 0.7, 0.7] ]);

          var m3 = m[fnName+'_'](m2);
          m3.should.eql(m);

          m3.data.should.eql(m.data);
          m3.data.should.eql(this.buildExpArr(mCopy, m2));
          m3.rows.should.eql(3);
          m3.cols.should.eql(4);
          m3.rows = 3;
          m3.cols = 4;
        }
      }
    }
  });


  // calculations

  test['Matrix']['calculations'] = {
    'getSum': function() {
      var m = new this.Matrix([ [0.1, 0.2, 0.5], [0.3, 1.4, 1.6] ]);

      var expected;
      if (options.adder) {
        expected = options.adder([0.1, 0.2, 0.5, 0.3, 1.4, 1.6]);
      } else {
        expected = 0.1 + 0.2 + 0.5 + 0.3 + 1.4 + 1.6;
      }

      m.getSum().should.eql(expected);
    },
  };


  // math transforms
  // 
  test['Matrix']['math-transforms'] = {
    'map': {
      'default': function() {
        var stub = this.mocker.spy(function(v) {
          return v * 2;
        });

        var m = new this.Matrix([ [1, 2, 3], [4, 5, 7] ]);

        var m2 = m.map(stub);
        m2.should.not.eql(m);

        m2.data.should.not.eql(m.data);
        m2.data.should.eql([ [2, 4, 6], [8, 10, 14] ]);
        m2.rows.should.eql(2);
        m2.cols.should.eql(3);

        stub.callCount.should.eql(6);
      },
      'in-place': function() {
        var stub = this.mocker.spy(function(v) {
          return v * 2;
        });

        var m = new this.Matrix([ [1, 2, 3], [4, 5, 7] ]);

        var m2 = m.map_(stub);
        m2.should.eql(m);

        m2.data.should.eql(m.data);
        m2.data.should.eql([ [2, 4, 6], [8, 10, 14] ]);
        m2.rows.should.eql(2);
        m2.cols.should.eql(3);

        stub.callCount.should.eql(6);          
      }
    },
    'eleMap': {
      'default': {
        'row transform': function() {
          var stub = this.mocker.spy(function(v, row, col) {
            switch (row){
              case 0: return v * 2;
              case 1: return v * 3;
              default: return v * 10;
            }
          });
          
          var m = new this.Matrix([ [1, 2, 3], [4, 5, 6], [7, 8, 9] ]);

          var m2 = m.eleMap(stub);
          m2.should.not.eql(m);

          m2.data.should.not.eql(m.data);
          m2.data.should.eql([ [2, 4, 6], [12, 15, 18], [70, 80, 90] ]);
          m2.rows.should.eql(3);
          m2.cols.should.eql(3);

          stub.callCount.should.eql(9);
        },
        'column transform': function() {
          var stub = this.mocker.spy(function(v, row, col) {
            switch (col) {
              case 0: return v * 2;
              case 1: return v * 3;
              default: return v * 10;
            }
          });

          var m = new this.Matrix([ [1, 2, 3], [4, 5, 6], [7, 8, 9] ]);

          var m2 = m.eleMap(stub);
          m2.should.not.eql(m);

          m2.data.should.not.eql(m.data);
          m2.data.should.eql([ [2, 6, 30], [8, 15, 60], [14, 24, 90] ]);
          m2.rows.should.eql(3);
          m2.cols.should.eql(3);

          stub.callCount.should.eql(9);
        },
        'element transform': function() {
          var stub = this.mocker.spy(function(v, row, col) {
            switch (row) {
              case 0:
                //First row
                switch (col) {
                  case 0: return v + 1;
                  case 1: return v + 2;
                  default: return v + 3;
                }
              case 1:
                //Second row
                switch (col) {
                  case 0: return v;
                  case 1: return v * 2;
                  default: return v * 3;
                }
              default:
                // All other rows
                switch (col) {
                  case 0: return v - 1;
                  case 1: return v - 2;
                  default: return v -3;
                }
            }
          });

          var m = new this.Matrix([ [1, 2, 3], [4, 5, 6], [7, 8, 9] ]);

          var m2 = m.eleMap(stub);
          m2.should.not.eql(m);

          m2.data.should.not.eql(m.data);
          m2.data.should.eql([ [2, 4, 6], [4, 10, 18], [6, 6, 6] ]);
          m2.rows.should.eql(3);
          m2.cols.should.eql(3);

          stub.callCount.should.eql(9);
        }
      },
      'in-place': {
        'row transform': function() {
          var stub = this.mocker.spy(function(v, row, col) {
            switch (row){
              case 0: return v * 2;
              case 1: return v * 3;
              default: return v * 10;
            }
          });
          
          var m = new this.Matrix([ [1, 2, 3], [4, 5, 6], [7, 8, 9] ]);

          var m2 = m.eleMap_(stub);
          m2.should.eql(m);

          m2.data.should.eql(m.data);
          m2.data.should.eql([ [2, 4, 6], [12, 15, 18], [70, 80, 90] ]);
          m2.rows.should.eql(3);
          m2.cols.should.eql(3);

          stub.callCount.should.eql(9);
        },
        'column transform': function() {
           var stub = this.mocker.spy(function(v, row, col) {
            switch (col) {
              case 0: return v * 2;
              case 1: return v * 3;
              default: return v * 10;
            }
          });

          var m = new this.Matrix([ [1, 2, 3], [4, 5, 6], [7, 8, 9] ]);

          var m2 = m.eleMap_(stub);
          m2.should.eql(m);

          m2.data.should.eql(m.data);
          m2.data.should.eql([ [2, 6, 30], [8, 15, 60], [14, 24, 90] ]);
          m2.rows.should.eql(3);
          m2.cols.should.eql(3);

          stub.callCount.should.eql(9);
        },
        'element transform': function() {
          var stub = this.mocker.spy(function(v, row, col) {
            switch (row) {
              case 0:
                //First row
                switch (col) {
                  case 0: return v + 1;
                  case 1: return v + 2;
                  default: return v + 3;
                }
              case 1:
                //Second row
                switch (col) {
                  case 0: return v;
                  case 1: return v * 2;
                  default: return v * 3;
                }
              default:
                //All other rows
                switch (col) {
                  case 0: return v - 1;
                  case 1: return v - 2;
                  default: return v -3;
                }
            }
          });

          var m = new this.Matrix([ [1, 2, 3], [4, 5, 6], [7, 8, 9] ]);

          var m2 = m.eleMap_(stub);
          m2.should.eql(m);

          m2.data.should.eql(m.data);
          m2.data.should.eql([ [2, 4, 6], [4, 10, 18], [6, 6, 6] ]);
          m2.rows.should.eql(3);
          m2.cols.should.eql(3);

          stub.callCount.should.eql(9);
        }
      }
    }
  }
  
  var otherMathTransforms = {
    log: [ function(v) { return Math.log(v); } ],
    sigmoid: [ function(v) { return 1 / (1 + Math.exp(-v)); } ],
    mulEach: [ function(v) { return v * 3.1; }, 3.1 ],
    plusEach: [ function(v) { return v + 3.1; }, 3.1 ],
  };
  Object.keys(otherMathTransforms).forEach(function(fnName) {
    var fnExpCalcFn = otherMathTransforms[fnName][0];
    var fnParam = otherMathTransforms[fnName][1];

    test['Matrix']['math-transforms'][fnName] = {
      'default': function() {
        var m = new this.Matrix([ [1, 2, 3], [4, 7, 6] ]);

        var m2 = m[fnName](fnParam);
        m2.should.not.eql(m);

        m2.data.should.not.eql(m.data);
        m2.data.should.eql([ [ fnExpCalcFn(1), fnExpCalcFn(2), fnExpCalcFn(3)], [fnExpCalcFn(4), fnExpCalcFn(7), fnExpCalcFn(6)] ]);
        m2.rows.should.eql(2);
        m2.cols.should.eql(3);
      },
      'in-place': function() {
        var m = new this.Matrix([ [1, 2, 3], [4, 7, 6] ]);

        var m2 = m[fnName + '_'](fnParam);
        m2.should.eql(m);

        m2.data.should.eql(m.data);
        m2.data.should.eql([ [ fnExpCalcFn(1), fnExpCalcFn(2), fnExpCalcFn(3)], [fnExpCalcFn(4), fnExpCalcFn(7), fnExpCalcFn(6)] ]);
        m2.rows.should.eql(2);
        m2.cols.should.eql(3);
      }
    }
  });

  // Vector

  test['Vector'] = {
    'beforeEach': function() {
      var linalg = linAlg(options);
      this.Matrix = linalg.Matrix;
      this.Vector = linalg.Vector;
    },

    'should be plain object': function() {
      (typeof this.Vector).should.eql('object');
    },

    '.zero': function() {
      var v = this.Vector.zero(5);

      v.should.be.instanceOf(this.Matrix);
      v.data.should.eql( [[0, 0, 0, 0, 0]] );
    }
  };



  return test;
};

