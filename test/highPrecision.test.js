"use strict";

var sinon = require('sinon'),
  chai = require('chai'),
  expect = chai.expect,
  should = chai.should();
chai.use(require('sinon-chai'));


var linAlg = require('../dist/linear-algebra.precision.min');


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

  var Vector = linAlg({
    add: adder
  }).Vector;

  var v1 = new Vector([0.1, 0.2, 0.3]),
    v2 = new Vector([2, 5, 10]);

  v1.dot(v2).should.eql(0.1*2 + 0.3*10 + 0.5); 
};



subTest['Vector']['sum'] = function() {
  var v = new this.Vector([1.1, 2, 3.2]);

  v.sum().should.eql(precisionAdder([1.1, 2, 3.2]));
}


test['high precision'] = subTest;

