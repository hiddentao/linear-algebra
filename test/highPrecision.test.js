"use strict";

var _ = require('lodash'),
  sinon = require('sinon'),
  chai = require('chai'),
  expect = chai.expect,
  should = chai.should();
chai.use(require('sinon-chai'));


var linAlg = require('../dist/linear-algebra.precision.min');


var test = module.exports = {
  beforeEach: function() {
    this.mocker = sinon.sandbox.create();
  },
  afterEach: function() {
    this.mocker.restore();
  }
};


var subTests = require('./_commonTests')(linAlg, {
  add: require('add')
});

subTests['custom adder'] = function() {
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



test['high precision'] = subTests;

