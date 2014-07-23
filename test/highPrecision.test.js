"use strict";

var sinon = require('sinon'),
  chai = require('chai'),
  expect = chai.expect,
  should = chai.should();
chai.use(require('sinon-chai'));


var linAlg = require('../dist/linear-algebra.precision');


var precisionAdder = require('add');


var test = module.exports = {
  beforeEach: function() {
    this.mocker = sinon.sandbox.create();
  },
  afterEach: function() {
    this.mocker.restore();
  }
};



var subTest = require('./_commonTests')(linAlg, {
  add: precisionAdder
});


subTest['custom adder'] = function() {
  // dummy adder skips every other value and then adds 0.5 to result
  var adder = function(floats) {
    var ret = 0;
    for (var i=0; i<floats.length; i+=2) {
      ret += floats[i];
    }
    return ret + 0.5;
  };

  var Matrix = linAlg({
    add: adder
  }).Matrix;

  var v1 = new Matrix([0.1, 0.2, 0.3]),
    v2 = new Matrix([2, 5, 10]);

  v1.dot(v2.trans()).data.should.eql([[ adder([0.1*2, 0.2*5, 0.3*10]) ]]); 
};



test['high precision'] = subTest;

