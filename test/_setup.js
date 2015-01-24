global.Metal = require('../src/' + require('../package').name);

var _ = require('lodash');
var chai = require('chai');
var sinon = require('sinon');
chai.use(require('sinon-chai'));

global._ = _;
global.expect = expect;

var sandbox;
beforeEach(function() {
  sandbox = sinon.sandbox.create();
  global.stub = _.bind(sandbox.stub, sandbox);
  global.spy  = _.bind(sandbox.spy, sandbox);
});

afterEach(function() {
  delete global.stub;
  delete global.spy;
  sandbox.restore();
});
