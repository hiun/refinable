var Behavior = require('..');
var assert = require('assert');

var Formula = new Behavior();

Formula.add(function a (n) {
  return n + 1;
});

Formula.add(function b (n) {
  return n + 2;
});

Formula.add(function c (n) {
  return n + 3;
});

Formula.c.delete();

var assert = require('assert');

describe('Behavior', function () {
  describe('#delete()', function () {
    it('correctness : should be return 6 as a result of formula', function () {
      return Formula.exec(1).then(function (result) {
        assert.equal(4, result);
      }).catch(assert.ifError);
    });
  });
});