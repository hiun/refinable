var Behavior = require('..');

var Formula = new Behavior();

Formula.add(function a (n) {
  return n + 1;
});

Formula.add(function b (n) {
  return n + 2;
});

Formula.b.after(function c (n) {
  return n * 0;
});

var assert = require('assert');

describe('Behavior', function() {
  describe('#after()', function() {
    it('correctness : should be return 0 as a result of after injection of formula', function() {
      Formula.exec(1, function (result) {
        assert.equal(0, result);
      });
    });
  });
});