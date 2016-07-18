let expect = require('chai').expect;
let assert = require('assert');
let React = require('../../client/bower_components/react/react.js');
let ReactDOM = require('../../client/bower_components/react/react-dom.js');

let Location = require('../../client/dist/Location');

describe('Location component', () => {
  describe('is an object that', () => {
    it('has a lat property', () => {
      assert.equal(typeof Location.lat, 'number');
    });
    it('has a long property', () => {
      assert.equal(typeof Location.long, 'number');
    });
  });
});
