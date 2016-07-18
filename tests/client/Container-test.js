let expect = require('chai').expect;
let assert = require('assert');
let React = require('../../client/bower_components/react/react.js');
let ReactDOM = require('../../client/bower_components/react/react-dom.js');

let Container = require('../../client/dist/Container');

describe('Container component', () => {
  it('is a function', () => {
    assert.equal(typeof Container, 'function');
  });
});
