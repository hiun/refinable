var Behavior = require('..');

var Formula = new Behavior();

Formula.add(function a (n) {
  return n + 'a';
});

Formula.add(function b (n) {
  return n + 'b';
});

Formula.add(function c (n) {
  return n + 'c';
});

Formula.add(function d (n) {
  return n + 'd';
});

Formula.assign({
  b: function b (n) {
    return n + 'Z';
  },
  d: function d (n) {
    return n + 'Z';
  }
});

var assert = require('assert');

describe('Behavior', function() {
  describe('#assign()', function() {
    it('correctness : should be return \'aZcZ\' as a result of formula', function () {
      return Formula.exec('').then(function (result) {
        assert.equal('aZcZ', result);
      }).catch(assert.ifError);
    });
  });
});