let expect = require('chai').expect;
let assert = require('assert');

let Container = require('../../client/dist/Container');

describe('Container component', () => {
  it('is a function', () => {
    assert.equal(typeof Container, 'function');
  });
});
