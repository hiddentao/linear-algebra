"use strict";

var sinon = require('sinon'),
  chai = require('chai'),
  expect = chai.expect,
  should = chai.should();
chai.use(require('sinon-chai'));


var linAlg = require('../dist/linear-algebra.min');


var test = module.exports = {
  beforeEach: function() {
    this.mocker = sinon.sandbox.create();
  },
  afterEach: function() {
    this.mocker.restore();
  }
};


var subTest = require('./_commonTests')(linAlg);

subTest['Vector']['sum'] = function() {
  var v = new this.Vector([1.1, 2, 3.2]);

  v.sum().should.eql(1.1 + 2 + 3.2);
}


test['normal precision'] = subTest;

