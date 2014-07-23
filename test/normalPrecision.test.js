"use strict";

var sinon = require('sinon'),
  chai = require('chai'),
  expect = chai.expect,
  should = chai.should();
chai.use(require('sinon-chai'));


var linAlg = require('../dist/linear-algebra');


var test = module.exports = {
  beforeEach: function() {
    this.mocker = sinon.sandbox.create();
  },
  afterEach: function() {
    this.mocker.restore();
  }
};


test['normal precision'] = require('./_commonTests')(linAlg);

