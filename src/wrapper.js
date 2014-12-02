(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['lodash'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('lodash'));
  } else {
    root.Metal = factory(root._);
  }
})(this, function(_) {
  'use strict';

  var _slice = Array.prototype.slice;

  // @include ./metal.js
  return Metal;
});
