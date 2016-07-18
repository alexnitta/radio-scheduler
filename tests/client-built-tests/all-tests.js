'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var expect = require('chai').expect;
var assert = require('assert');
var React = require('../../client/bower_components/react/react.js');
var ReactDOM = require('../../client/bower_components/react/react-dom.js');

var Container = require('../../client/dist/Container');

describe('Container component', function () {
  it('is a function', function () {
    assert.equal(typeof Container === 'undefined' ? 'undefined' : _typeof(Container), 'function');
  });
});
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var expect = require('chai').expect;
var assert = require('assert');
var React = require('../../client/bower_components/react/react.js');
var ReactDOM = require('../../client/bower_components/react/react-dom.js');

var Location = require('../../client/dist/Location');

describe('Location component', function () {
  describe('is an object that', function () {
    it('has a lat property', function () {
      assert.equal(_typeof(Location.lat), 'number');
    });
    it('has a long property', function () {
      assert.equal(_typeof(Location.long), 'number');
    });
  });
});