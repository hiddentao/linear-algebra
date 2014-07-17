"use strict";

var sinon = require('sinon');
var chai = require('chai'),
  expect = chai.expect,
  should = chai.should();
chai.use(require('sinon-chai'));


var linAlg = require('../index');


var mocker = null;

var test = module.exports = {
  beforeEach: function() {
    mocker = sinon.sandbox.create();
  },
  afterEach: function() {
    mocker.restore();
  }
};


test['node interface'] = {
  'references': function() {
    linAlg._normal.should.be.instanceof(Function);
    linAlg._precision.should.be.instanceof(Function);
  },
  'init': {
    'normal': function() {
      mocker.stub(linAlg, '_normal', function() {
        return 'abc';
      });

      linAlg().should.eql('abc');
    },
    'precision': function() {
      mocker.stub(linAlg, '_precision', function() {
        return 'abc';
      });

      linAlg({
        add: true
      }).should.eql('abc');
    },    
  }
};


