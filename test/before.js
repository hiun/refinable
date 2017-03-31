var Behavior = require('..');

var Formula = new Behavior();

Formula.add(function a (n) {
  return n + 1;
});

Formula.add(function c (n) {
  return n + 2;
});

Formula.c.before(function b (n) {
  return n * 0;
});

var assert = require('assert');

describe('Behavior', function() {
  describe('#before()', function() {
    it('correctness : should be return 2 as a result of before injection of formula', function () {
      return Formula.exec(1).then(function (result) {
        assert.equal(2, result);
      }).catch(assert.ifError);
    });
  });
});