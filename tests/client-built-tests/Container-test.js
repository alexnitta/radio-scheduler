'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var expect = require('chai').expect;
var assert = require('assert');

var Container = require('../../client/dist/Container');

describe('Container component', function () {
  it('is a function', function () {
    assert.equal(typeof Container === 'undefined' ? 'undefined' : _typeof(Container), 'function');
  });
});